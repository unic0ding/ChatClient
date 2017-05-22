import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../auth.service';
import {Observable} from 'rxjs/Observable';
/**
 * Created by basti on 22.05.17.
 */

// Guard for checking if the user is already logged in
@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      return false;
    }
    if (this.authService.getAuthFromLocalStorage() !== null) {
      this.authService.isLoggedIn = true;
      this.authService.setUser();
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}
