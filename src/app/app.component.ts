import {Component} from '@angular/core';
import {Contact} from './share/model/contact.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addNewChat = false;
  newChatForm: FormGroup;
  openChats = [{contact: new Contact(1, 'adsf', 'asdf', 'asdf', 'asdf')}];
  // , {contact: new Contact(1, 'aa', 'asdf', 'asdf', 'asdf')}, {contact: new Contact(1, 'lkj', 'asdf', 'asdf', 'asdf')}];

  constructor(private formBuilder: FormBuilder) {
    if (this.openChats.length === 0) {
      this.addNewChat = true;
    }

    this.newChatForm = this.formBuilder.group({
      name: this.formBuilder.control(null, Validators.compose([Validators.required, Validators.pattern('(\\w{2,})')]))
    });
  }

  onSubmitNewChat() {
    console.log(this.newChatForm.value);
    this.openChats.push({contact: new Contact(1, this.newChatForm.value, 'asdf', 'asdf', 'asdf')});
    this.newChatForm.reset();
    this.addNewChat = false;
  }

  openNewChatCard() {
    this.addNewChat = !this.addNewChat;
  }

  closeNewChatCard() {
    this.addNewChat = false;
  }

  onClose(event) {
    if (confirm('Do you really want to close the Chat?')) {
      const index = this.openChats.indexOf(event.contact, 0);
      if (index > -1) {
        this.openChats.splice(index, 1);
      }
    }

  }

}
