import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../share/model/contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
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
