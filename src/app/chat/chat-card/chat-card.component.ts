import {Component, OnInit} from '@angular/core';
import {Message} from '../../share/model/message.model';
import {Contact} from '../../share/model/contact.model';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit {
  open = true;
  sentMessage: Message;
  sentMessage2: Message;
  recvMessage: Message;
  recvMessage2: Message;
  me: Contact;
  inContact: Contact;

  constructor() {
    this.me = new Contact(1, 'me', 'as', 'asd', 'asd');
    this.inContact = new Contact(2, 'Rainer Winkler', 'as', 'asd', 'asd');
    this.sentMessage = new Message(1, new Date(), this.me, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed' +
      ' diam non et dolore magna aliquyam erat :D Now, the fun part. To make an arrow in CSS, check out this great post ' +
      'in CSS Tricks. www.google.com Basically, you’re just creating a very think border for a rectangle with one ' +
      'non-existent side. So your code will look something like this:');
    this.recvMessage = new Message(1, new Date(), this.inContact, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ' +
      'sed diam  et dolore magna aliquyam erat');
    this.recvMessage2 = new Message(1, new Date(), this.inContact, 'Ok :D ');
    this.sentMessage2 = new Message(1, new Date(), this.inContact, 'Bye :* ');

  }

  closeCard() {
    this.open = false;
  }

  ngOnInit() {
  }

}
