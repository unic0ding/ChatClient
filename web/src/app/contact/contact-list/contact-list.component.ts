import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Contact} from '../../share/model/contact.model';
import {Observable} from 'rxjs/Rx';
import {ContactService} from '../../share/services/contact.service';
import {compare} from '../../share/utils/sort';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, AfterViewInit {
  contactList = [];
  viewContactList = [];

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactList = this.contactService.contactList;
    this.viewContactList = this.contactList;

    // bind to ContactService contactListSubject
    this.contactService.contactListSubject.subscribe(contacts => {
      this.contactList = contacts;
      this.viewContactList = this.contactList.sort(compare);
    });
  }

  ngAfterViewInit(): void {
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

}
