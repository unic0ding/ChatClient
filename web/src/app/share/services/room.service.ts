import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Channel} from '../model/channel.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RoomService {
  public channelList = [];
  public channelListSubject: Subject<Array<Channel>> = new Subject<Array<Channel>>();

  constructor(private webSocketService: WebsocketService) {

    this.getListener()
      .filter((event) => event.event === 'allRooms' || event.event === 'newRoom')
      .subscribe(event => {
        if (event.event === 'newRoom') {
          this.channelList.push(Channel.fromJson(event.data));
          this.channelListSubject.next(this.channelList);
        }
        if (event.event === 'allRooms') {
          this.channelList = Channel.fromJsonArray(event.data);
          this.channelListSubject.next(this.channelList);
        }
      });
    this.getAllRooms();
  }

  createRoom(channel: Channel) {
    const command = {type: 'command', subtype: 'room', command: 'createRoom', data: channel};
    console.log(command);
    this.webSocketService.emit(command);
  }

  leaveRoom(channel: Channel) {
    const command = {type: 'command', subtype: 'room', command: 'leaveRoom', data: channel};
    this.webSocketService.emit(command);
  }

  getListener() {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.subtype === 'room' || data.error === 'roomError');
    return listener$;
  }

  getAllRooms() {
    const command = {type: 'command', subtype: 'room', command: 'getAllRooms'};
    this.webSocketService.emit(command);
  }


}
