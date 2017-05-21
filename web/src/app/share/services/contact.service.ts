import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Contact} from '../model/contact.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ContactService {
  contactList = [];
  contactListSubject: Subject<Array<Contact>> = new Subject<Array<Contact>>();

  constructor(private webSocketService: WebsocketService) {
    this.getListener()
      .filter((event) => event.event === 'allUsers' || event.event === 'newUser')
      .subscribe(event => {
        if (event.event === 'newUser') {
          this.contactList.push(Contact.fromJson(event.data));
          this.contactListSubject.next(this.contactList);
        }
        if (event.event === 'allUsers') {
          this.contactList = Contact.fromJsonArray(event.data);
          this.contactListSubject.next(this.contactList);
        }
      });
    this.getAllContacts();
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.subtype === 'user');

    return listener$;
  }

  getAllContacts() {
    const command = {type: 'command', subtype: 'user', command: 'getAllUsers'};
    this.webSocketService.emit(command);
  }
}
