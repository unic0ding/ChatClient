import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Message} from '../../share/model/message.model';
import {Contact} from '../../share/model/contact.model';
import {ChatService} from '../../share/services/chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Channel} from '../../share/model/channel.model';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit, OnDestroy {
  @Output() closeWindow = new EventEmitter();
  @Input() channel: Channel;
  @Input() contact: Contact;
  messages = [];
  // chatSubject;
  socket: WebSocket;
  listener: EventEmitter<any>;
  chatForm: FormGroup;
  notification;
  private url = 'ws://echo.websocket.org';
  // private url = 'ws://localhost:8080/echo';


  constructor(private chatService: ChatService, private formBuilder: FormBuilder) {
    this.contact = new Contact(1, 'Drachenlord', 'altschauerberg8@emskirchen.de');
    this.chatForm = this.formBuilder.group({
      message: this.formBuilder.control(null, Validators.required)
    });

    // this.chatSubject = this.chatService.getMessages(this.url);
    // this.chatSubject.subscribe(
    //   (msg) => {
    //     const message = new Message(1, new Date(), new Contact(1, '', ''), msg);
    //     this.messages.push({message: message, incoming: true});
    //   },
    //   (error) => {
    //     const message = new Message(1, new Date(), new Contact(1, '', ''), 'An error occurred');
    //     this.messages.push({message: message, incoming: true});
    //   },

    // (complete) => {
    //   const message = new Message(1, new Date(), new Contact(1, '', '', '', ''), 'Channel closed');
    //   this.messages.push({message: message, incoming: true});
    // }
    // );
  }


  // sendMessage() {
  //   let message = this.chatForm.value.message;
  //   this.chatSubject.next(message);
  //   message = new Message(1, new Date(), this.contact, message);
  //   this.messages.push({message: message, incoming: false});
  //   this.chatForm.reset();
  // }

  sendMessage() {
    const message = this.chatForm.value.message;
    const m = new Message(1, new Date(), this.contact, message);
    try {
      this.socket.send(m.toJson());
    } catch (e) {
      console.log('Still connecting...');
    }
    this.messages.push({message: m, incoming: false});
    this.chatForm.reset();
  }

  ngOnInit() {
    this.socket = new WebSocket(this.url);
    this.listener = new EventEmitter();
    this.socket.onopen = event => {
      this.listener.emit({'type': 'open', 'data': event});
    };
    this.socket.onclose = event => {
      this.listener.emit({'type': 'close', 'data': event});
    };
    this.socket.onmessage = event => {
      this.listener.emit({'type': 'message', 'data': event.data});
    };

    this.listener.subscribe(event => {
      if (event.type === 'message') {
        this.updateNotification();
        const message = Message.fromJson(event.data);
        this.messages.push({message: message, incoming: true});
      }
      if (event.type === 'close') {
        const m = new Message(1, new Date(), this.contact, '/The socket connection has been closed');
        this.messages.push({message: m, incoming: true});
      }
      if (event.type === 'open') {
        const m = new Message(1, new Date(), this.contact, '/The socket connection has been established');
        this.messages.push({message: m, incoming: true});
      }
    });
  }

  updateNotification(event?) {
    if (event === 0) {
      this.notification = null;
      return;
    }
    if (this.notification) {
      this.notification++;
    } else {
      this.notification = 1;
    }
  }

  ngOnDestroy(): void {
    this.socket.close();
    // this.chatSubject.complete();
  }
}
