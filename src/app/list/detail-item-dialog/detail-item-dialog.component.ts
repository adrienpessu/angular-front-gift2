import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-item-dialog',
  templateUrl: './detail-item-dialog.component.html',
  styleUrls: ['./detail-item-dialog.component.css']
})
export class DetailItemDialogComponent implements OnInit {

  label = '';

  giftForm = new FormGroup({
    id: new FormControl(''),
    label: new FormControl(''),
    description: new FormControl(''),
    childId: new FormControl(''),
    url: new FormControl(''),
    url2: new FormControl(''),
    url3: new FormControl(''),
    pics: new FormControl(''),
    santaName: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<DetailItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  valider() {
    this.dialogRef.close(this.giftForm.value);
  }

  ngOnInit() {
    this.giftForm.valueChanges.subscribe(result => this.label = result.label);
    this.giftForm.patchValue(this.data.item);
  }

}
