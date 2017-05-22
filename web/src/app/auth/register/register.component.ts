import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordValidator} from '../../share/utils/password-validator';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {fallIn} from '../../share/animations/animations';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fallIn]
})
export class RegisterComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private registerForm: FormGroup;
  loading = false;
  emailControl;
  passwordControl;
  confirmPasswordControl;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackbar: MdSnackBar) {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.registerForm = formBuilder.group({
      name: formBuilder.control(null, Validators.required),
      email: formBuilder.control(null, [Validators.required, Validators.pattern(emailRegEx)]),
      password: formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      confirm_password: formBuilder.control(null, [Validators.minLength(8)])
    }, {validator: passwordValidator('password', 'confirm_password')});

    this.passwordControl = this.registerForm.get('password');
    this.confirmPasswordControl = this.registerForm.get('confirm_password');
    this.emailControl = this.registerForm.get('email');
  }

  onSubmitForm() {
    this.loading = true;
    console.log(this.registerForm.value);
    const registrationListener$ = this.authService.sendRegistration({
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    });

    registrationListener$
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event) => {
        this.loading = false;
        if (event.event === 'registrationSuccess') {
          this.registerForm.reset();
          this.router.navigate(['/chat']);
        }
        if (event.error === 'registrationError') {
          this.snackbar.open(event.data, 'close', {duration: 500});
        }
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
      });
  }

  ngOnInit() {
  }

}
