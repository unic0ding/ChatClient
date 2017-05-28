import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/services/auth.service';
import {Contact} from '../../share/model/contact.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailRegEx} from '../../share/utils/email-pattern';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  user: Contact;
  userForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
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
    this.user.name = this.userForm.value.name;
    this.user.avatarUrl = this.userForm.value.avatarUrl;
    this.authService.user = this.user;

    this.authService.setAuthToLocalStorage(this.user);
    // TODO: send command to Server
  }

  reset() {
   this.buildForm();
  }

  ngOnInit() {
  }

}
