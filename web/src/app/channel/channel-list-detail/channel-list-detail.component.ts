import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Channel} from '../../share/model/channel.model';

@Component({
  selector: 'app-channel-list-detail',
  templateUrl: './channel-list-detail.component.html',
  styleUrls: ['./channel-list-detail.component.css']
})
export class ChannelListDetailComponent implements OnInit {
  @Input() channel: Channel;
  @Output() addNewChannel = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
}
