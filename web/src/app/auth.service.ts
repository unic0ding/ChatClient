import {Injectable} from '@angular/core';
import {WebsocketService} from './share/services/websocket.service';
import {Contact} from './share/model/contact.model';

@Injectable()
export class AuthService {
  public isLoggedIn = false;
  public redirectUrl: string;
  public user: Contact;

  constructor(private webSocketService: WebsocketService) {
    this.user = new Contact(1, 'Drachenlord', 'altschauerberg8@emskirchen.de');
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => {
        if (data.subtype === 'auth') {
          return data;
        }
      });

    return listener$;
  }

  login(value) {
    const command = {type: 'command', subtype: 'auth', command: 'login', data: value};
    this.webSocketService.emit(command);
    return this.getListener()
      .filter((event) => event.subtype === 'auth');
  }

  logout() {
    const command = {type: 'command', subtype: 'auth', command: 'logout'};
    this.webSocketService.emit(command);
    this.isLoggedIn = false;
  }
}
