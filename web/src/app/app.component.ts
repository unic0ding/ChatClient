import {Component} from '@angular/core';
import {WebsocketService} from './share/services/websocket.service';
import {AuthService} from './share/services/auth.service';
import {MdSnackBar} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loaded = false;

  constructor(private webSocketService: WebsocketService, private authService: AuthService, private snackBar: MdSnackBar) {
    // open Listener
    this.connect();
    // closed Listener
    this.getClosedListener();
  }

  logout() {
    this.authService.logout();
  }

  connect() {
    this.webSocketService.connect()
      .delay(2000) // Just for tests
      .subscribe(() => {
        this.loaded = true;
      });
  }

  getClosedListener() {
    this.webSocketService.getClosedListener()
      .do(console.log)
      .subscribe((event) => {
        this.loaded = false;
        this.snackBar.open(`Connection Closed - Reason: '${event.reason || 'None'}'`, 'close');
        this.reconnect();
      });
  }

  reconnect() {
    const ngUnsubscribe = new Subject<any>();
    Observable.interval(5000)
      .takeUntil(ngUnsubscribe)
      .subscribe(() => {
        this.webSocketService.connect()
          .subscribe(() => {
            this.loaded = true;
            this.getClosedListener();
            ngUnsubscribe.next();
            ngUnsubscribe.complete();
          });
      });
  }
}
