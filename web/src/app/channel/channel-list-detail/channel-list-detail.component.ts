import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Channel} from '../../share/model/channel.model';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {ChatInfoDialogComponent} from '../../chat/chat-info-dialog/chat-info-dialog.component';

@Component({
  selector: 'app-channel-list-detail',
  templateUrl: './channel-list-detail.component.html',
  styleUrls: ['./channel-list-detail.component.css']
})
export class ChannelListDetailComponent implements OnInit {
  @Input() channel: Channel;
  @Output() addNewChannel = new EventEmitter();

  constructor(private infoDialog: MdDialog) {
  }

  openInfoDialog() {
    const config = new MdDialogConfig();
    config.width = '50%';
    const dialogRef = this.infoDialog.open(ChatInfoDialogComponent, config);
    dialogRef.componentInstance.channel = this.channel;

  }

  ngOnInit() {
  }
}
