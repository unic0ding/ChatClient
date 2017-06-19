import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Channel} from '../model/channel.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../model/contact.model';

@Injectable()
export class ChannelService {
  public channels = {};
  public channelListSubject: Subject<Array<Object>> = new Subject<Array<Object>>();
  public openChats = [];
  public selectedChat = 0;

  constructor(private webSocketService: WebsocketService) {

    this.getListener()
      .filter((event) => event.event === 'allRooms' || event.event === 'newRoom' || event.event === 'newMember' || event.event === 'leaveRoom')
      .subscribe(event => {
        if (event.event === 'newRoom') {
          const channel = Channel.fromJson(event.data);
          if (!this.channels[channel.name]) {
            this.channels[channel.name] = channel;
            this.channelListSubject.next(Object.values(this.channels));
          }
        }
        if (event.event === 'allRooms') {
          this.channels = Channel.fromJsonArray(event.data);
          this.channelListSubject.next(Object.values(this.channels));
        }
        if (event.event === 'newMember') {
          const user = Contact.fromJson(event.data.user);
          const name = event.data.name;
          this.channels[name].members.push(Contact.fromJson(user));
          this.channelListSubject.next(Object.values(this.channels));
        }
        if (event.event === 'leaveRoom') {
          const name = event.data.channelName;
          this.channels[name].members = this.channels[name].members.filter(c => c.id !== event.data.userId);
          this.channelListSubject.next(Object.values(this.channels));
        }
      });
    this.getAllRooms();
  }

  createRoom(channel: Channel) {
    const command = {type: 'command', subtype: 'room', command: 'createRoom', data: channel.name};
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
