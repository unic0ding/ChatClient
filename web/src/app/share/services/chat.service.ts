import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Message} from '../model/message.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatService {

  constructor(private webSocketService: WebsocketService) {
  }

  sendMessage(message: Message) {
    const command = {type: 'command', command: 'message', data: message};
    this.webSocketService.emit(command);
  }

  getListener(): Observable<any> {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.event === 'chat');

    return listener$;
  }
}
