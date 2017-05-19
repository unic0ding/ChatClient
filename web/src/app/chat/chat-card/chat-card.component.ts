import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Message} from '../../share/model/message.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Channel} from '../../share/model/channel.model';
import {ChatService} from '../../share/services/chat.service';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit, OnDestroy {
  @Output() closeWindow = new EventEmitter();
  @Output() writing = new EventEmitter();
  @Input() channel: Channel;
  private messages = [];
  private unsentMessages = [];
  private chatForm: FormGroup;
  private connectionClosed = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private chatService: ChatService, private authService: AuthService, private formBuilder: FormBuilder) {

    this.chatForm = this.formBuilder.group({
      message: this.formBuilder.control(null, Validators.required)
    });
  }

  ngOnInit() {
    const messageListener$ = this.chatService.getListener()
      .filter(event => event.subtype === 'chat' || event.event === 'chatError');

    messageListener$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(event => {
        if (event.event === 'newMessage' && event.roomName === this.channel.name) {
          this.messages.push({message: Message.fromJson(event.data), incoming: true});
          this.channel.updateNotification();
        }
        if (event.error === 'chatError') {
          console.log(event.data);
        }
      });
  }

  private sendMessage(message?: Message) {
    if (!message) {
      const text = this.chatForm.value.message;
      message = new Message(1, new Date(), this.authService.user, text);
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
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
