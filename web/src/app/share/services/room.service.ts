import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Channel} from '../model/channel.model';

@Injectable()
export class RoomService {

  constructor(private webSocketService: WebsocketService) {
  }

  createRoom(channel: Channel) {
    const command = {type: 'command', command: 'room', subtype: 'createRoom', data: channel};
    console.log(command);
    this.webSocketService.emit(command);
  }

  leaveRoom(channel: Channel) {
    const command = {type: 'command', subtype: 'room', command: 'leaveRoom', data: channel};
    console.log(command);
    this.webSocketService.emit(command);
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.event === 'room' || data.event === 'roomError');

    return listener$;
  }

}
