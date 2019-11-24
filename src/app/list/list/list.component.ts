import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DetailItemDialogComponent } from '../detail-item-dialog/detail-item-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ListService } from './list.service';
import { filter, flatMap, take } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  gifts: ItemList[] = [];

  admin = false;

  constructor(public dialog: MatDialog, private listService: ListService, private router: Router, private loginService: LoginService) {
    this.admin = this.loginService.hasRole('admin');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        const url = urlAfterRedirects.split(';')[0];
        if (urlAfterRedirects.startsWith('/list')) {
          const childId = urlAfterRedirects.split('/')[urlAfterRedirects.split('/').length - 1];
          this.loadGifts(childId);
        }
        console.log(url);
      });
  }

  editDialog(currentItem: ItemList): void {
    const dialogRef = this.dialog.open(DetailItemDialogComponent, {
      width: '250px',
      data: { item: currentItem }
    });

    dialogRef.afterClosed().pipe(take(1), filter(res => res && res.confirm)).subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  deleteDialog(currentItem: ItemList): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { item: currentItem }
    });

    dialogRef.afterClosed().pipe(take(1), filter(res => res && res.confirm), flatMap(result => this.listService.deleteGift(currentItem.id))).subscribe(result => {
      this.gifts = this.gifts.filter(item => item.id !== currentItem.id);
    });
  }

  confimDialog(currentItem: ItemList): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { item: currentItem }
    });

    dialogRef.afterClosed().pipe(take(1), flatMap(result => this.listService.putGift({
      ...currentItem,
      santaName: result.santaName
    })))
      .subscribe(result => {
        this.gifts = this.gifts.map(item => {
          if (item.id === currentItem.id) {
            return result;
          } else {
            return item;
          }
        });
      });
  }

  private loadGifts(childId) {
    this.listService.getGifts(childId).pipe(take(1)).subscribe(result => this.gifts = result);
  }

  ngOnInit() {

  }
}
