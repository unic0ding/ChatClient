import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent {

  constructor(private authService: AuthService) {
  }

  login(value) {
    this.authService.login(value);
  }
}
