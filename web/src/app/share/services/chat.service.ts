import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Message} from '../model/message.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatService {

  constructor(private webSocketService: WebsocketService) {
  }

  sendMessage(message: Message, channelName: string) {
    const command = {
      type: 'command',
      subtype: 'message',
      command: 'newMessage',
      data: {message: message, channelName: channelName}
    };
    this.webSocketService.emit(command);
  }

  getListener(): Observable<any> {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.subtype === 'chat');
    return listener$;
  }
}
