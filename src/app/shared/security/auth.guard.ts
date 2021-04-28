import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityContext, SecurityService } from './security.service';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly security: SecurityService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const backUrl = state.url;
    return this.security.securityContext$.pipe(isAuthenticated(), this.navigateToSignInIfUserNotAuthenticated(backUrl));
  }

  private navigateToSignInIfUserNotAuthenticated(backUrl: string) {
    return tap<boolean>((isAuthenticated) => {
      if (!isAuthenticated) {
        setTimeout(() => this.security.navigateToSignIn(backUrl));
      }
    });
  }
}

function isAuthenticated() {
  return map<SecurityContext | undefined, boolean>((securityContext) => !!securityContext);
}
