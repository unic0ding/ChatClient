import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Channel} from '../model/channel.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChannelService {
  public channelList = [];
  public channelListSubject: Subject<Array<Channel>> = new Subject<Array<Channel>>();
  public openChats = [];
  public selectedChat = 0;

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
    return this.getListener()
      .filter((event) => event.event === 'newChannelSuccess' || event.error === 'newChannelError');
  }

  leaveRoom(channel: Channel) {
    const command = {type: 'command', subtype: 'room', command: 'leaveRoom', data: channel};
    this.webSocketService.emit(command);
  }

  getListener(): Observable<any> {
    const listener$ = this.webSocketService.getListener()
      .filter((data) => data.subtype === 'room');
    return listener$;
  }

  getAllRooms() {
    const command = {type: 'command', subtype: 'room', command: 'getAllRooms'};
    this.webSocketService.emit(command);
  }


}
