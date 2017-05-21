import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../../share/model/contact.model';

@Component({
  selector: 'app-contact-list-detail',
  templateUrl: './contact-list-detail.component.html',
  styleUrls: ['./contact-list-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  data: number;

  constructor() {
  }

  ngOnInit() {
  }

  clickButton() {
    if (this.data) {
      this.data++;
    } else {
      this.data = 1;
    }
  }

}
