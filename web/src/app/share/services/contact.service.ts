import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Contact} from '../model/contact.model';

@Injectable()
export class ContactService {

  constructor(private webSocketService: WebsocketService) {
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.event === 'user');

    return listener$;
  }

  getUserProfile(contact: Contact) {
    const command = {type: 'command', subtype: 'user', command: 'getProfile', data: contact};
    this.webSocketService.emit(command);
  }
}
