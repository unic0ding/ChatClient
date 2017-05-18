import {AfterViewInit, Component} from '@angular/core';
import {Contact} from '../../share/model/contact.model';
import {Observable} from 'rxjs/Rx';
import {ContactService} from '../../share/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements AfterViewInit {
  contactList = [];
  viewContactList = [];

  constructor(private contactService: ContactService) {
    this.viewContactList = this.contactList;
  }

  ngAfterViewInit(): void {
    // Contact Listener
    const contactListener$ = this.contactService.getListener();

    contactListener$.subscribe((event) => {
      if (event.subtype === 'allUsers') {
        this.contactList = Contact.fromJsonArray(event.data);
        this.viewContactList = this.contactList.sort(this.compare);
      }
      if (event.subtype === 'newUser') {
        this.contactList.push(Contact.fromJson(event.data));
        this.viewContactList = this.contactList.sort(this.compare);
      }
    });

    // Contact Search
    const search: any = document.getElementById('contactSearchInput');
    const channelSource$ = Observable.fromEvent(search, 'input')
      .debounceTime(250)
      .do(() => this.viewContactList = [])
      .switchMap(() => Observable.from(this.contactList))
      .filter(c => {
        if (c.name.toLowerCase().includes(search.value.toLowerCase())) {
          return c;
        }
      });
    channelSource$.subscribe(
      (contact) => {
        this.viewContactList.push(contact);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

}
