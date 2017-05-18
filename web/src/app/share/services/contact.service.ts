import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';

@Injectable()
export class ContactService {

  constructor(private webSocketService: WebsocketService) {
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.event === 'user');

    return listener$;
  }

}
