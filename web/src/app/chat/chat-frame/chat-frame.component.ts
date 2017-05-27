import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Channel} from '../../share/model/channel.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../share/services/room.service';
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
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  addNewChat = false;
  selectedTab = 0;

  constructor(private roomService: RoomService, private authService: AuthService, private formBuilder: FormBuilder) {
    this.openChats = [];
    this.openChats = roomService.openChats;

    this.buildChatForm();
  }

  ngOnInit(): void {
    // get selected tab
    this.chatTabGroup.selectedIndex = this.roomService.selectedChat;

    const roomListener$ = this.roomService.getListener();
    // TODO: Create Room listener
    roomListener$
      .takeUntil(this.ngUnsubscribe)
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
      this.roomService.leaveRoom(channel);
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
    this.addNewChat = !this.addNewChat;
  }

  onSubmitNewChat() {
    const channel = new Channel(this.newChatForm.value.name, [this.authService.user]);
    this.roomService.createRoom(channel);
    this.newChatForm.reset();
    this.addNewChat = false;
  }

  saveMessages(channel) {
    const index = this.openChats.indexOf(this.openChats.filter(c => c.name === channel.name)[0], 0);
    this.openChats[index] = channel;
  }

  ngOnDestroy(): void {
    // save selected tab
    this.roomService.selectedChat = this.selectedTab;
    // save openChats
    this.roomService.openChats = this.openChats;

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
