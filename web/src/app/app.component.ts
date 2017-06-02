import {Component} from '@angular/core';
import {WebsocketService} from './share/services/websocket.service';
import {AuthService} from './share/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loaded = false;
  private url = 'ws://localhost:8080/room';
  // private url = 'ws://192.168.178.33:8080';

  constructor(private webSocketService: WebsocketService, private authService: AuthService) {
    const openListener$ = this.webSocketService.connect(this.url)
      .delay(2000) // Just for tests
      .subscribe(() => {
        this.loaded = true;
      });

    const closeListener$ = this.webSocketService.getClosedListener()
      .subscribe((event) => {
        this.loaded = false;
        console.log('Connection Closed: ', event);
      });
  }

  logout() {
    this.authService.logout();
  }
}
