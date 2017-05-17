import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';

@Injectable()
export class RoomService {

  constructor(private webSocketService: WebsocketService) {
  }

  createRoom(name: string) {
    const command = {type: 'command', command: 'message', data: name};
    this.webSocketService.emit(command);
  }

  getAllRooms() {
    const command = {type: 'command', command: 'message'};
    this.webSocketService.emit(command);
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => {
        if (data.event === 'room') {
          return data;
        }
      });
  }

}
