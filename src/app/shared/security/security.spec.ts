import { Provider } from '@angular/core';
import { SecurityContext, SecurityService } from './security.service';
import { of } from 'rxjs';

export function securityServiceProviderFor(userEmail: string): Provider {
  return {
    provide: SecurityService,
    useValue: {
      securityContext$: of<SecurityContext | undefined>({
        email: userEmail,
        jwtAccessToken: 'Some token',
      }),
    },
  };
}
