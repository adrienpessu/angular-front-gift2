import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DetailItemDialogComponent } from '../detail-item-dialog/detail-item-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ListService } from './list.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  gifts: ItemList[] = [];

  constructor(public dialog: MatDialog,
    private listService: ListService) { }

  editDialog(currentItem: ItemList): void {
    const dialogRef = this.dialog.open(DetailItemDialogComponent, {
      width: '250px',
      data: {item: currentItem}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  confimDialog(currentItem: ItemList): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {item: currentItem}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  ngOnInit() {
    this.listService.getGifts('adrien').pipe(take(1)).subscribe(result => this.gifts = result)
    this.gifts = this.listService.getGiftsDefaults()
  }

}
