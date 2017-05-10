import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../share/model/message.model';
import {Contact} from '../../share/model/contact.model';
import {ChatService} from '../../share/services/chat.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit, OnDestroy {
  open = true;
  message: string;
  messages = [];

  constructor(private chatService: ChatService) {

  }

  closeCard() {
    this.open = false;
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    const m = new Message(1, new Date(), new Contact(1, 'Drache', 'adsf', '', ''), this.message);
    this.messages.push({message: m, incoming: false});
    this.message = '';
  }

  ngOnInit() {
    this.chatService.getEventListener().subscribe(event => {
      if (event.type === 'message') {
        const data = event.data;
        const m = new Message(1, new Date(), new Contact(1, 'Drache', 'adsf', '', ''), data);
        this.messages.push({message: m, incoming: true});
      }
      if (event.type === 'close') {
        const m = new Message(1, new Date(), new Contact(1, 'Drache', 'adsf', '', ''), '/The socket connection has been closed');
        this.messages.push({message: m, incoming: true});
      }
      if (event.type === 'open') {
        const m = new Message(1, new Date(), new Contact(1, 'Drache', 'adsf', '', ''), '/The socket connection has been established');
        this.messages.push({message: m, incoming: true});
      }
    });
  }

  ngOnDestroy(): void {
    this.chatService.close();
  }
}
