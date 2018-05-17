import {Component, OnInit, Inject, Input} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-detail-item-dialog',
  templateUrl: './detail-item-dialog.component.html',
  styleUrls: ['./detail-item-dialog.component.css']
})
export class DetailItemDialogComponent implements OnInit {

  item: ItemList;

  constructor(
    public dialogRef: MatDialogRef<DetailItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  valider() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.item = this.data.item;
  }

}
