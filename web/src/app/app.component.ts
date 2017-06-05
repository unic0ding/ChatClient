import {Component} from '@angular/core';
import {WebsocketService} from './share/services/websocket.service';
import {AuthService} from './share/services/auth.service';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loaded = false;

  constructor(private webSocketService: WebsocketService, private authService: AuthService, private snackBar: MdSnackBar) {
    // open Listener
    this.webSocketService.connect()
      .delay(2000) // Just for tests
      .subscribe(() => {
        this.loaded = true;
      });

    // closed Listener
    this.webSocketService.getClosedListener()
      .subscribe((event) => {
        this.loaded = false;
        this.snackBar.open(`Connection Closed - Reason: '${event.reason || 'None'}'`, 'close');
        console.log('Connection Closed: ', event);
      });
  }

  logout() {
    this.authService.logout();
  }
}
