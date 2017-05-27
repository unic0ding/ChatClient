import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Channel} from '../../share/model/channel.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChannelService} from '../../share/services/channel.service';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../../share/services/auth.service';
import {fallIn} from '../../share/animations/animations';

@Component({
  selector: 'app-chat-frame',
  templateUrl: './chat-frame.component.html',
  styleUrls: ['./chat-frame.component.css'],
  animations: [fallIn]
})
export class ChatFrameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chatTabGroup') chatTabGroup;
  openChats: Array<Channel>;
  newChatForm: FormGroup;
  private ngUnsubscribeChannel: Subject<void> = new Subject<void>();
  private ngUnsubscribeNewChannel: Subject<void> = new Subject<void>();
  newChatError: string;
  addNewChat = false;
  showSpinner = false;
  selectedTab = 0;

  constructor(private channelService: ChannelService, private authService: AuthService, private formBuilder: FormBuilder) {
    this.openChats = [];
    this.openChats = channelService.openChats;

    this.buildChatForm();
  }

  ngOnInit(): void {
    // get selected tab
    this.chatTabGroup.selectedIndex = this.channelService.selectedChat;

    const roomListener$ = this.channelService.getListener();
    // TODO: Create Room listener
    roomListener$
      .takeUntil(this.ngUnsubscribeChannel)
      .subscribe();
  }

  ngAfterViewInit(): void {
    if (this.openChats.length > 0) {
      this.openChats[this.chatTabGroup.selectedIndex].setNotification(false);
    }
  }

  buildChatForm(): void {
    this.newChatForm = this.formBuilder.group({
      name: this.formBuilder.control(null, Validators.compose([Validators.required, Validators.pattern('(\\w{2,})')]))
    });
  }

  onConnectNewChannel(channel: Channel) {
    if (this.openChats.indexOf(channel) === -1) {
      this.openChats.push(channel);
    }
  }

  unsetNotification(index: number) {
    // set notification on old tab
    if (this.openChats[this.selectedTab]) {
      this.openChats[this.selectedTab].setNotification(true);
    }
    // unset notification on new tab
    if (index > -1) {
      this.openChats[index].setNotification(false);
      this.selectedTab = index;
    }
  }

  onClose(channel: Channel) {
    if (confirm('Do you really want to close the Chat?')) {
      this.channelService.leaveRoom(channel);
      const index = this.openChats.indexOf(channel, 0);
      if (index > -1) {
        this.openChats[index].setNotification(true);
        this.openChats.splice(index, 1);
        if (this.openChats.length === 0) {
          return;
        }
        if (index === this.openChats.length) {
          this.openChats[this.selectedTab - 1].setNotification(false);
        } else {
          if (this.openChats.length > 0) {
            this.openChats[this.selectedTab].setNotification(false);
          }
        }
      }
    }
  }

  collapseNewChatForm() {
    this.newChatError = '';
    this.newChatForm.reset();
    this.addNewChat = !this.addNewChat;
  }

  onSubmitNewChat() {
    const channel = new Channel(this.newChatForm.value.name, [this.authService.user]);
    this.showSpinner = true;
    this.channelService.createRoom(channel)
      .takeUntil(this.ngUnsubscribeNewChannel)
      .subscribe(
        (event) => {
          this.showSpinner = false;
          if (event.event === 'newChannelSuccess') {
            this.openChats.push(channel);
            this.newChatForm.reset();
            this.addNewChat = false;
          }
          if (event.error === 'newChannelError') {
            this.newChatError = event.data;
          }
          this.ngUnsubscribeNewChannel.next();
          this.ngUnsubscribeNewChannel.complete();
        }

      );
  }

  saveMessages(channel) {
    const index = this.openChats.indexOf(this.openChats.filter(c => c.name === channel.name)[0], 0);
    this.openChats[index] = channel;
  }

  ngOnDestroy(): void {
    // save selected tab
    this.channelService.selectedChat = this.selectedTab;
    // save openChats
    this.channelService.openChats = this.openChats;

    this.ngUnsubscribeChannel.next();
    this.ngUnsubscribeChannel.complete();
  }
}
