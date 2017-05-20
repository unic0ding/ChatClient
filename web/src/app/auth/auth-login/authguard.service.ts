/**
 * Created by basti on 20.05.17.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const url = state.url;


    return this.checkLogin(url);
  }

  checkLogin(url) {
    if (this.authService.isLoggedIn) {
      console.log('is Logged in');
      return true;
    }

    this.authService.redirectUrl = url;

    this.router.navigate(['/auth-login']);
    return false;
  }
}
