import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../share/model/message.model';
import {ContactDetailDialogComponent} from '../../contact/contact-detail-dialog/contact-detail-dialog.component';
import {Contact} from '../../share/model/contact.model';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {ImageDialogComponent} from './image-dialog/image-dialog.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() incoming: boolean;

  constructor(private contactInfoDialog: MdDialog, private imageDialog: MdDialog) {
  }

  ngOnInit() {
  }

  openContactInfo(contact: Contact) {
    const config = new MdDialogConfig();
    config.width = '30%';
    const dialogRef = this.contactInfoDialog.open(ContactDetailDialogComponent, config);
    dialogRef.componentInstance.contact = contact;
  }

  openImageDialog() {
    const config = new MdDialogConfig();
    config.width = '90%';
    config.height = '80%';
    const dialogRef = this.imageDialog.open(ImageDialogComponent, config);
    dialogRef.componentInstance.data = {img: this.message.data};
  }

}
