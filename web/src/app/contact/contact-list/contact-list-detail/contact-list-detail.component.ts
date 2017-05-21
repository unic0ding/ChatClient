import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../../share/model/contact.model';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {ContactDetailDialogComponent} from '../../contact-detail-dialog/contact-detail-dialog.component';

@Component({
  selector: 'app-contact-list-detail',
  templateUrl: './contact-list-detail.component.html',
  styleUrls: ['./contact-list-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  data: number;

  constructor(private contactDetailDialog: MdDialog) {
  }

  ngOnInit() {
  }

  clickButton() {
    if (this.data) {
      this.data++;
    } else {
      this.data = 1;
    }
  }

  openContactDialog() {
    const config = new MdDialogConfig();
    config.width = '30%';
    const dialogRef = this.contactDetailDialog.open(ContactDetailDialogComponent, config);
    dialogRef.componentInstance.contact = this.contact;
  }

}
