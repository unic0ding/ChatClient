import {AfterViewChecked, Component, ElementRef, Input, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Channel} from '../../share/model/channel.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdGridList} from '@angular/material';

@Component({
  selector: 'app-chat-frame',
  templateUrl: './chat-frame.component.html',
  styleUrls: ['./chat-frame.component.css'],
})
export class ChatFrameComponent {
    addNewChat = false;
    newChatForm: FormGroup;
    openChats: Array<Channel>;
    @Input() channel: Channel;
    @Output()
    newChannel:EventEmitter<any> = new EventEmitter();

    set addNewChannel(value: Channel) {
      this.openChats.push(value);
    }

    constructor(private formBuilder: FormBuilder) {
      this.openChats = [new Channel('Channel Name', [])];
      if (this.openChats.length === 0) {
        this.addNewChat = true;
      }

      this.newChatForm = this.formBuilder.group({
        name: this.formBuilder.control(null, Validators.compose([Validators.required, Validators.pattern('(\\w{2,})')]))
      });
    }

    onSubmitNewChat() {
      this.openChats.push(new Channel(this.newChatForm.value.name, []));
      this.newChatForm.reset();
      this.addNewChat = false;
    }

    onConnectNewChannel(channel: Channel) {
      console.log("Hello");
      if (this.openChats.indexOf(channel) === -1) {
        this.openChats.push(channel);
      }
    }

    openNewChatCard() {
      this.addNewChat = !this.addNewChat;
    }

    closeNewChatCard() {
      this.addNewChat = false;
    }

    onClose(event) {

      if (confirm('Do you really want to close the Chat?')) {
        const index = this.openChats.indexOf(event, 0);
        if (index > -1) {
          this.openChats.splice(index, 1);
        }
      }
    }
}
