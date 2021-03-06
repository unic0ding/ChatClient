import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordValidator} from '../../share/utils/password-validator';
import {AuthService} from '../../share/services/auth.service';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {fallIn} from '../../share/animations/animations';
import {Subject} from 'rxjs/Subject';
import {emailRegEx} from '../../share/utils/email-pattern';

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
    this.buildRegisterForm();
  }

  buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      name: this.formBuilder.control(null, Validators.required),
      email: this.formBuilder.control(null, [Validators.required, Validators.pattern(emailRegEx)]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      confirm_password: this.formBuilder.control(null, [Validators.minLength(8)])
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
