import { Component } from '@angular/core';
import { SecurityContext, SecurityService } from '../security/security.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ba-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed = true;
  readonly userEmail$: Observable<string>;

  constructor(private readonly security: SecurityService) {
    this.userEmail$ = security.securityContext$.pipe(userEmail());
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  logOut(): void {
    this.security.signOut();
  }
}

function userEmail() {
  return map<SecurityContext | undefined, string>((securityContext) => securityContext?.email || '');
}
