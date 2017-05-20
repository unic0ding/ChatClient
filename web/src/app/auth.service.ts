import {Injectable} from '@angular/core';
import {WebsocketService} from './share/services/websocket.service';
import {Contact} from './share/model/contact.model';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  public isLoggedIn = false;
  public redirectUrl: string;
  public user: Contact;
  private storageKey = 'auth';

  constructor(private webSocketService: WebsocketService, private router: Router) {
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((event) => event.subtype === 'auth');

    return listener$;
  }

  login(value) {
    const command = {type: 'command', subtype: 'auth', command: 'login', data: value};
    this.webSocketService.emit(command);
    return this.getListener()
      .filter((event) => event.event === 'authSuccess' || event.error === 'authError')
      .do((event) => {
        if (event.event === 'authSuccess') {
          this.isLoggedIn = true;
          this.setAuthToLocalStorage(event.data.user);
          this.user = Contact.fromJson(event.data.user);
        }
      });
  }

  setAuthToLocalStorage(value) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  getAuthFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  logout() {
    const command = {type: 'command', subtype: 'auth', command: 'logout'};
    this.webSocketService.emit(command);
    this.isLoggedIn = false;
    window.localStorage.removeItem(this.storageKey);
    this.router.navigate(['/auth-login']);
  }

  setUser() {
    this.user = Contact.fromJson(this.getAuthFromLocalStorage());
  }
}
