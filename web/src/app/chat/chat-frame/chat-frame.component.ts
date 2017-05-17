import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Channel} from '../../share/model/channel.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../share/services/room.service';

@Component({
  selector: 'app-chat-frame',
  templateUrl: './chat-frame.component.html',
  styleUrls: ['./chat-frame.component.css'],
})
export class ChatFrameComponent implements AfterViewInit {
  addNewChat = false;
  newChatForm: FormGroup;
  openChats: Array<Channel>;
  @ViewChild('chatTabGroup') chatTabGroup;
  selectedTab = 0;

  constructor(private roomService: RoomService, private formBuilder: FormBuilder) {
    this.openChats = [new Channel('Channel_Name', [])];
    // this.openChats = [];
    if (this.openChats.length === 0) {
      this.addNewChat = true;
    }

    this.newChatForm = this.formBuilder.group({
      name: this.formBuilder.control(null, Validators.compose([Validators.required, Validators.pattern('(\\w{2,})')]))
    });
  }

  ngAfterViewInit(): void {
    if (this.openChats.length > 0) {
      this.openChats[this.chatTabGroup.selectedIndex].setNotification(false);
    }
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

  onClose(event) {

    if (confirm('Do you really want to close the Chat?')) {
      const index = this.openChats.indexOf(event, 0);
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
    console.log(this.newChatForm.value);
    // this.roomService.createRoom(this.newChatForm.value.name);
  }
}
