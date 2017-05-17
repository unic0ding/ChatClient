import {Component} from '@angular/core';
import {WebsocketService} from './share/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loaded = false;
  private url = 'ws://localhost:8080/room';

  constructor(private webSocketService: WebsocketService) {
    const openListener$ = this.webSocketService.connect(this.url)
      .subscribe(() => {
        this.loaded = true;
      });
  }
}
