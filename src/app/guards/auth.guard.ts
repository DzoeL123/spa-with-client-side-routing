import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: UserAuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const url = route.url.map(segment => segment.path).join('/');
    console.log('Inside auth guard: ', url);

    return this.authService.isUserLoggedIn$.pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          if (url === 'login') {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        } else {
          if (url === 'login') {
            return true;
          }
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }

}
