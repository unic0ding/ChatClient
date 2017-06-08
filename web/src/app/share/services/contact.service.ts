import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Contact} from '../model/contact.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContactService {
  contactList = [];
  contactListSubject: Subject<Array<Contact>> = new Subject<Array<Contact>>();

  constructor(private webSocketService: WebsocketService) {
    this.getListener()
      .filter((event) => event.subtype === 'user')
      .subscribe(event => {
        if (event.event === 'newUser') {
          this.contactList.push(Contact.fromJson(event.data));
          this.contactListSubject.next(this.contactList);
        }
        if (event.event === 'allUsers') {
          this.contactList = Contact.fromJsonArray(event.data);
          this.contactListSubject.next(this.contactList);
        }
        if (event.event === 'userLeaves') {
          const leavingUser = Contact.fromJson(event.data);
          this.contactList = this.contactList.filter(contact => contact.id !== leavingUser.id);
          this.contactListSubject.next(this.contactList);
        }
      });
    this.getAllContacts();
  }

  getListener(): Observable<any> {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.subtype === 'user');

    return listener$;
  }

  getAllContacts() {
    const command = {type: 'command', subtype: 'user', command: 'getAllUsers'};
    Observable.timer(10000)
      .subscribe(() => {
        this.webSocketService.emit(command);
      });
  }
}
