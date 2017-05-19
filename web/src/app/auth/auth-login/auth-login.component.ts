import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {fallIn} from '../../share/animations/animations';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
  animations: [fallIn]
})
export class AuthLoginComponent {

  constructor(private authService: AuthService) {
  }

  login(value) {
    this.authService.login(value);
  }
}
