import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  santaName: string = ''

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  changeSantaName(event) {
    this.santaName = event.target.value;
  }

  valider() {
    this.dialogRef.close({
      confirm: true,
      santaName: this.santaName ? this.santaName : 'le père noël'
    });
  }

  ngOnInit() {
  }


}
