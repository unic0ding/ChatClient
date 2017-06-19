import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/services/auth.service';
import {Contact} from '../../share/model/contact.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailRegEx} from '../../share/utils/email-pattern';
import {Subject} from 'rxjs/Subject';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  user: Contact;
  userForm: FormGroup;
  showProgress = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private snackbar: MdSnackBar) {
    this.user = authService.user;

    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      avatarUrl: this.formBuilder.control(this.user.avatarUrl),
      name: this.formBuilder.control(this.user.name, Validators.required),
      email: this.formBuilder.control(this.user.email, Validators.compose([Validators.required, Validators.pattern(emailRegEx)]))
    });
  }

  updateUser() {
    if (!(this.user.name === this.userForm.value.name && this.user.avatarUrl === this.userForm.value.avatarUrl
      && this.user.email === this.userForm.value.email)) {
      this.user.name = this.userForm.value.name;
      this.user.avatarUrl = this.userForm.value.avatarUrl;
      this.user.email = this.userForm.value.email;
      this.showProgress = true;
      const ngUnsubscribe: Subject<void> = new Subject<void>();

      this.authService.updateUserProfile(this.user)
        .takeUntil(ngUnsubscribe)
        .subscribe(event => {
          this.showProgress = false;
          if (event.event === 'updateUserProfileSuccess') {
            // TODO: set Response to authservice.user
            this.authService.user = this.user;
            this.authService.setAuthToLocalStorage(this.user);
            this.snackbar.open('Changes saved', 'close', {duration: 500});
          }
          if (event.error === 'updateUserProfileError') {
            this.snackbar.open(event.data, 'close', {duration: 500});
          }
          ngUnsubscribe.next();
          ngUnsubscribe.complete();
        });
    }
  }

  reset() {
    this.buildForm();
  }

  ngOnInit() {
  }

}
