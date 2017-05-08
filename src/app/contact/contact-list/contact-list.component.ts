import {Component, OnInit} from '@angular/core';
import {Contact} from '../../share/model/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // contactList: Array<Contact>;
  contactList = [];

  constructor() {
    this.contactList.push(new Contact(1, 'Rainer Winkler', 'dracheoffiziell@altschauerberg.de', 'a', ''));
  }

  ngOnInit() {
  }

}
