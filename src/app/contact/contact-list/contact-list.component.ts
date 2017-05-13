import {AfterViewInit, Component} from '@angular/core';
import {Contact} from '../../share/model/contact.model';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements AfterViewInit {
  contactList = [];
  viewContactList = [];

  constructor() {
    this.contactList.push(new Contact(1, 'Rainer Winkler', 'dracheoffiziell@altschauerberg.de'));
    this.contactList.push(new Contact(1, 'Bryan Cranston', 'bryan@example.de'));
    this.contactList.push(new Contact(1, 'Aaron Paul', 'aaron@example.de'));
    this.contactList.push(new Contact(1, 'Bob Odenkirk', 'Bob@example.de'));
    this.contactList.push(new Contact(1, 'Harrison Ford', 'Harrison@example.de'));
    this.contactList.push(new Contact(1, 'Mark Hamill', 'Mark@example.de'));
    this.viewContactList = this.contactList;
  }

  ngAfterViewInit(): void {
    const search: any = document.getElementById('contactSearchInput');
    const contactSource$ = Observable.fromEvent(search, 'input')
      .debounceTime(250)
        .do(() => this.viewContactList = [])
      .switchMap(() => Observable.from(this.contactList))
      .filter(c => {
        if (c.name.toLowerCase().includes(search.value.toLowerCase())) {
          return c;
        }
      });
    contactSource$.subscribe(
      (contact) => {
        this.viewContactList.push(contact);
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
