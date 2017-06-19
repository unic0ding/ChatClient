import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Contact} from '../../share/model/contact.model';

@Component({
  selector: 'app-contact-detail-dialog',
  templateUrl: './contact-detail-dialog.component.html',
  styleUrls: ['./contact-detail-dialog.component.css']
})
export class ContactDetailDialogComponent implements OnInit {
  contact: Contact;

  constructor(public dialogRef: MdDialogRef<ContactDetailDialogComponent>) {
  }

  ngOnInit() {
  }

}
