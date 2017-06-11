import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Channel} from '../../share/model/channel.model';
import {ChannelService} from '../../share/services/channel.service';
import {Contact} from '../../share/model/contact.model';

@Component({
  selector: 'app-chat-info-dialog',
  templateUrl: './chat-info-dialog.component.html',
  styleUrls: ['./chat-info-dialog.component.css']
})
export class ChatInfoDialogComponent implements OnInit {
  channel: Channel;
  members: Array<Contact>;

  constructor(public dialogRef: MdDialogRef<ChatInfoDialogComponent>, private channelService: ChannelService) {
  }

  ngOnInit() {
    this.members = this.channelService.channels[this.channel.name].members;
  }

}
