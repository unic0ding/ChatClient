import {Injectable} from '@angular/core';
import {WebsocketService} from './share/services/websocket.service';

@Injectable()
export class AuthService {

  constructor(private webSocketService: WebsocketService) {
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
}
