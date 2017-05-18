import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';

@Injectable()
export class RoomService {

  constructor(private webSocketService: WebsocketService) {
  }

  createRoom(name: string) {
    const command = {type: 'command', command: 'room', subtype: 'createRoom', data: name};
    this.webSocketService.emit(command);
  }

  getAllRooms() {
    const command = {type: 'command', command: 'room'};
    this.webSocketService.emit(command);
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.event === 'room' || data.event === 'roomError');

    return listener$;
  }

}
