import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { UserService } from '../user/shared/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: UserService,
              private router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    const routeUrl: string = '/' + state.url.split('/')[1];

    if (this.auth.isAuthenticated()) {
      if (routeUrl === '/login' || routeUrl ==='/register') {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } else if (routeUrl === '/login' || routeUrl ==='/register') {
        return true;
    }

    this.router.navigate(['/login', {M: "NO_AUTH"}]);
    return false;
  }
}
