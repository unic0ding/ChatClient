import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Message} from '../model/message.model';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../model/contact.model';

@Injectable()
export class ChatService {
  public errorContact = new Contact(1, 'OpenChat', '', 'https://avatars3.githubusercontent.com/u/28691703?v=3&s=200')

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
