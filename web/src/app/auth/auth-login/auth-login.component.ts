import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {fallIn} from '../../share/animations/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
  animations: [fallIn]
})
export class AuthLoginComponent {
  authForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

    this.authForm = this.formBuilder.group({
      user: this.formBuilder.control(null, Validators.email),
      password: this.formBuilder.control(null, Validators.required)
    });
  }

  login() {
    if (this.authForm.valid) {
      this.authForm.reset();
      this.authService.login(this.authForm.value).subscribe(
        (event) => {
          if (event.event === 'authSuccess') {
            this.authService.isLoggedIn = true;
            console.log(this.authService.redirectUrl);
            if (this.authService.redirectUrl) {
              this.router.navigate([this.authService.redirectUrl]);
            } else {
              this.router.navigate(['/chat']);
            }
          }
          if (event.error === 'authError') {
            console.log(event.data);
            this.authForm.reset();
          }
        }
      );
    }
  }

  loginGoogle() {
    // TODO: Google Login
  }

  loginGithub() {
    // TODO: GitHub Login
  }
}
