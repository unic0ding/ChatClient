import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Channel} from '../../share/model/channel.model';

@Component({
  selector: 'app-chat-info-dialog',
  templateUrl: './chat-info-dialog.component.html',
  styleUrls: ['./chat-info-dialog.component.css']
})
export class ChatInfoDialogComponent implements OnInit {
  channel: Channel;

  constructor(public dialogRef: MdDialogRef<ChatInfoDialogComponent>) { }

  ngOnInit() {
  }

}
