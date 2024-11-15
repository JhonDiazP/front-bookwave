import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const allowedRoles = next.data['allowedRoles'];
    const userRole = this.authService.GetRole();
    if(allowedRoles && allowedRoles.includes(userRole)){
      this.router.navigate(['/auth/login']);
    }
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['/auth/login']);
    }
    if (next.data['redirect'] == 'home') {
      this.router.navigate(['/']);      
    }
    return true;
  }
}