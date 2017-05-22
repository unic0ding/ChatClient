import {FormGroup} from '@angular/forms';
/**
 * Created by basti on 22.05.17.
 */
export function passwordValidator(passwordKey: string, confirmPasswordKey: string) {

  return (group: FormGroup): { [key: string]: any } => {
    const password = group.controls[passwordKey];
    const confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {mismatchPasswords: true};
    }
  };
}
