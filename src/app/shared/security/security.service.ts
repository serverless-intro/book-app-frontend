import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Auth, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

export interface SecurityContext {
  email: string;
  jwtAccessToken: string;
}

@Injectable()
export class SecurityService {
  readonly securityContext$: Observable<SecurityContext | undefined>;

  constructor(private readonly router: Router) {
    Auth.configure(environment.authConfig);
    this.securityContext$ = createUserContextFromCurrentSession();
    this.navigateToBackUrlOnSignIn();
  }

  navigateToSignIn(backUrl?: string): Promise<void> {
    const backUrlKey = this.storeBackUrl(backUrl);

    return Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Cognito,
      customState: backUrlKey,
    }).then(() => undefined);
  }

  signOut(): Promise<void> {
    return Auth.signOut();
  }

  private navigateToBackUrlOnSignIn(): void {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      if (event === 'customOAuthState') {
        const url = getBackUrlBy(data);
        this.router.navigateByUrl(url);
      }
    });

    function getBackUrlBy(key: string): string {
      const url = localStorage.getItem(key) || '/';
      localStorage.removeItem(key);
      return url;
    }
  }

  private storeBackUrl(backUrl?: string): string {
    const key = `URL-${Date.now()}`;
    localStorage.setItem(key, backUrl || this.router.url);
    return key;
  }
}

function createUserContextFromCurrentSession(): Observable<SecurityContext | undefined> {
  return fromPromise(
    Auth.currentSession().then(
      (currentSession) => ({
        jwtAccessToken: currentSession.getIdToken().getJwtToken(),
        email: currentSession.getIdToken().payload.email,
      }),
      () => undefined,
    ),
  );
}
