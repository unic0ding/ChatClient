import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {fallIn} from '../../share/animations/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
  animations: [fallIn]
})
export class AuthLoginComponent {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  authForm: FormGroup;
  loading = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private snackbar: MdSnackBar) {

    this.authForm = this.formBuilder.group({
      user: this.formBuilder.control(null, Validators.email),
      password: this.formBuilder.control(null, Validators.required)
    });
  }

  login() {
    if (this.authForm.valid) {
      this.loading = true;
      this.authService.login(this.authForm.value)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          (event) => {
            this.loading = false;
            if (event.event === 'authSuccess') {
              this.authForm.reset();
              if (this.authService.redirectUrl) {
                this.router.navigate([this.authService.redirectUrl]);
              } else {
                this.router.navigate(['/chat']);
              }
            }
            if (event.error === 'authError') {
              this.authForm.reset();
              this.snackbar.open(event.data, 'close', {duration: 500});
            }
            this.ngUnsubscribe.next();
            this.ngUnsubscribe.complete();
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
