import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Channel} from '../model/channel.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../model/contact.model';

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
          const channel = Channel.fromJson(event.data);
          if (this.channelList.filter(c => c.name === channel.name).length === 0) {
            this.channelList.push(channel);
            this.channelListSubject.next(this.channelList);
          }
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
    this.webSocketService.emit(command);
    return this.getListener()
      .filter((event) => event.event === 'newChannelSuccess' || event.error === 'newChannelError');
  }

  joinRoom(channel: Channel, user: Contact) {
    const command = {type: 'command', subtype: 'room', command: 'joinRoom', data: {user: user, channel: channel}};
    this.webSocketService.emit(command);
    return this.getListener()
      .filter((event) => event.event === 'joinRoomSuccess' || event.error === 'joinRoomError');
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
