import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Channel} from './share/model/channel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addNewChat = false;
  newChatForm: FormGroup;
  openChats: Array<Channel>;

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
    this.openChats.push(channel);
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
