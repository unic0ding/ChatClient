import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Channel} from '../../share/model/channel.model';
import {Observable} from 'rxjs/Observable';
import {RoomService} from '../../share/services/room.service';
import {compare} from '../../share/utils/sort';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit, AfterViewInit {
  @Output() newChannel = new EventEmitter();
  viewChannelList = [];
  channelList = [];

  constructor(private roomService: RoomService) {
  }

  ngOnInit() {
    this.channelList = this.roomService.channelList;
    this.viewChannelList = this.channelList;

    // bind to RoomService ChannelListSubject
    this.roomService.channelListSubject.subscribe(rooms => {
        this.channelList = rooms;
        this.viewChannelList = this.channelList.sort(compare);
      }
    );
  }

  ngAfterViewInit(): void {

    // Channel Search Observable
    const search: any = document.getElementById('channelSearchInput');
    const channelSource$ = Observable.fromEvent(search, 'input')
      .debounceTime(250)
      .do(() => this.viewChannelList = [])
      .switchMap(() => Observable.from(this.channelList))
      .filter(c => {
        if (c.name.toLowerCase().includes(search.value.toLowerCase())) {
          return c;
        }
      });
    channelSource$.subscribe(
      (contact) => {
        this.viewChannelList.push(contact);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onConnectNewChannel(channel: Channel) {
    this.newChannel.emit(channel);
  }


}
