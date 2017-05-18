import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Message} from '../../share/model/message.model';
import {Contact} from '../../share/model/contact.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Channel} from '../../share/model/channel.model';
import {ChatService} from '../../share/services/chat.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit, OnDestroy {
  @Output() closeWindow = new EventEmitter();
  @Input() channel: Channel;
  @Input() contact: Contact;
  private messages = [];
  private unsentMessages = [];
  private chatForm: FormGroup;
  private connectionClosed = false;

  constructor(private chatService: ChatService, private formBuilder: FormBuilder) {
    this.contact = new Contact(1, 'Drachenlord', 'altschauerberg8@emskirchen.de');

    this.chatForm = this.formBuilder.group({
      message: this.formBuilder.control(null, Validators.required)
    });
  }

  ngOnInit() {
    const messageListener$ = this.chatService.getListener()
      .filter(event => event.subtype === 'message');

    messageListener$.subscribe(event => {
      this.messages.push({message: Message.fromJson(event.data), incoming: true});
          this.channel.updateNotification();
    });
    // this.socket = new WebSocket(this.url);
    // const listener = Observable.fromEvent(this.socket, 'message')
    //   .map((event) => <MessageEvent>event);
    //
    // listener.subscribe((event) => {
    //     this.updateNotification();
    //     const message = Message.fromJson(event.data);
    //     this.messages.push({message: message, incoming: true});
    //     this.channel.updateNotification();
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //
    //   () => {
    //     const message = new Message(0, new Date(), new Contact(0, 'Socket', ''), 'Socket Connection Closed');
    //     this.messages.push({message: message, incoming: true});
    //     this.connectionClosed = true;
    //   }
    // );

    // const openListener = Observable.fromEvent(this.socket, 'open');
    //
    // openListener.subscribe(() => {
    //   for (const message of this.unsentMessages) {
    //     this.sendMessage(message);
    //   }
    //   this.unsentMessages = [];
    // });
    //
    // const closeListener = Observable.fromEvent(this.socket, 'close')
    //   .map((event) => <MessageEvent>event);
    //
    // closeListener.subscribe((event) => console.log(event));
  }

  private sendMessage(message?: Message) {
    if (!message) {
      const text = this.chatForm.value.message;
      message = new Message(1, new Date(), this.contact, text);
      this.messages.push({message: message, incoming: false});
      this.chatForm.reset();
    }
    try {
      this.chatService.sendMessage(message);
    } catch (e) {
      this.unsentMessages.push(message);
      console.log('No Connection');
    }
  }

  clearHistory() {
    this.messages = [];
  }

  ngOnDestroy(): void {
  }
}
