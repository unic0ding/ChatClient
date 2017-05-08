import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../share/model/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() incoming: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
