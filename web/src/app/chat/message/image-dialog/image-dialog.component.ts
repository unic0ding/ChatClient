import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {
  data;
  constructor(public dialogRef: MdDialogRef<ImageDialogComponent>) { }

  ngOnInit() {
  }

}
