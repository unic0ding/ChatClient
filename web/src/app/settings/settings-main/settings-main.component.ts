import {Component} from '@angular/core';
import {fallIn} from '../../share/animations/animations';
import {AuthService} from '../../auth.service';
import {Contact} from '../../share/model/contact.model';


@Component({
  selector: 'app-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.css'],
  animations: [fallIn]
})
export class SettingsMainComponent {
  constructor() {
  }
}
