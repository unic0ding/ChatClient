import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../share/model/message.model';
import {ContactDetailDialogComponent} from '../../contact/contact-detail-dialog/contact-detail-dialog.component';
import {Contact} from '../../share/model/contact.model';
import {MdDialog, MdDialogConfig} from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() flags;

  constructor(private contactInfoDialog: MdDialog) {
  }

  ngOnInit() {
  }

  openContactInfo(contact: Contact) {
    const config = new MdDialogConfig();
    config.width = '30%';
    const dialogRef = this.contactInfoDialog.open(ContactDetailDialogComponent, config);
    dialogRef.componentInstance.contact = contact;
  }

}
