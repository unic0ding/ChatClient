import {Injectable} from '@angular/core';
import {WebsocketService} from './share/services/websocket.service';
import {Contact} from './share/model/contact.model';

@Injectable()
export class AuthService {
  public user: Contact;

  constructor(private webSocketService: WebsocketService) {
    this.user = new Contact(1, 'Drachenlord', 'altschauerberg8@emskirchen.de');
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => {
        if (data.event === 'auth') {
          return data;
        }
      });

    return listener$;
  }

  login(value) {
    const command = {type: 'command', command: 'auth', method: 'login', data: value};
    this.webSocketService.emit(command);
  }

  logout() {
    const command = {type: 'command', command: 'auth', method: 'logout'};
    this.webSocketService.emit(command);
  }
}
