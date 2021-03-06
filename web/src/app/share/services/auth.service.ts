import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Contact} from '../model/contact.model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public isLoggedIn = false;
  public redirectUrl: string;
  public user: Contact;
  private storageKey = 'auth';

  constructor(private webSocketService: WebsocketService, private router: Router) {
  }

  getListener(): Observable<any> {
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

  checkLogin(user) {
    const command = {type: 'command', subtype: 'auth', command: 'checkLogin', data: {user: user}};
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
    const command = {type: 'command', subtype: 'auth', command: 'logout', data: this.user};
    this.webSocketService.emit(command);
    this.isLoggedIn = false;
    this.removeUserFromLocalStorage();
    this.router.navigate(['/auth-login']);
    Observable.timer(1000).subscribe(() => window.location.reload(true));
  }

  removeUserFromLocalStorage() {
    window.localStorage.removeItem(this.storageKey);
  }

  setUser() {
    this.user = Contact.fromJson(this.getAuthFromLocalStorage());
  }

  sendRegistration(user) {
    const command = {type: 'command', subtype: 'auth', command: 'newRegistration', data: user};
    this.webSocketService.emit(command);

    return this.getListener()
      .filter((event) => event.event === 'registrationSuccess' || event.error === 'registrationError')
      .do(console.log)
      .do((event) => {
        if (event.event === 'registrationSuccess') {
          this.isLoggedIn = true;
          this.setAuthToLocalStorage(event.data.user);
          this.user = Contact.fromJson(event.data.user);
        }
      });
  }

  updateUserProfile(user: Contact) {
    // TODO: Update on Server
    const command = {type: 'command', subtype: 'auth', command: 'updateUserProfile', data: user};
    this.webSocketService.emit(command);
    return this.getListener()
      .filter(event => event.event === 'updateUserProfileSuccess' || event.error === 'updateUserProfileError');
  }
}
