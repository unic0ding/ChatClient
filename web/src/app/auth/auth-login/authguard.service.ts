/**
 * Created by basti on 20.05.17.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../share/services/auth.service';
import {MdSnackBar} from '@angular/material';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private snackbar: MdSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const url = state.url;


    return this.checkLogin(url);
  }

  checkLogin(url) {
    if (this.authService.isLoggedIn) {
      return true;
    }
    if (this.authService.getAuthFromLocalStorage() !== null) {
      const ngUnsubscribe = new Subject<any>();
      this.authService.checkLogin(this.authService.getAuthFromLocalStorage())
        .takeUntil(ngUnsubscribe)
        .subscribe(event => {
          console.log(event);
          if (event.event === 'authSuccess') {
            console.log('Login Success');
            this.router.navigate([url]);
          }
          if (event.error === 'authError') {
            console.log('Login ERROR');
            this.router.navigate(['/AuthError']);
            this.authService.isLoggedIn = false;
            this.authService.removeUserFromLocalStorage();
            this.snackbar.open('Error in Authentication', 'close', {duration: 500});
          }
          ngUnsubscribe.next();
          ngUnsubscribe.complete();
        });
      this.authService.isLoggedIn = true;
      this.authService.setUser();
      return true;
    }

    this.authService.redirectUrl = url;

    this.router.navigate(['/auth-login']);
    return false;
  }
}
