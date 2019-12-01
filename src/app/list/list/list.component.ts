import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DetailItemDialogComponent } from '../detail-item-dialog/detail-item-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ListService } from './list.service';
import { filter, flatMap, take } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  gifts: ItemList[] = [];
  childId = '';

  admin = false;

  constructor(public dialog: MatDialog, private listService: ListService, private router: Router, private loginService: LoginService) {
    this.admin = this.loginService.hasRole('admin');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        const url = urlAfterRedirects.split(';')[0];
        if (urlAfterRedirects.startsWith('/list')) {
          this.childId = urlAfterRedirects.split('/')[urlAfterRedirects.split('/').length - 1];
          this.loadGifts(this.childId);
        }
        console.log(url);
      });
  }

  editDialog(currentItem: ItemList): void {
    const dialogRef = this.dialog.open(DetailItemDialogComponent, {
      width: '550px',
      data: { item: currentItem }
    });

    dialogRef.afterClosed().pipe(
      take(1),
      filter(res => res),
      flatMap(result => this.listService.putGift(result))
    ).subscribe(result => {
      this.gifts = this.gifts.map(item => {
        if (item.id === currentItem.id) {
          return result;
        } else {
          return item;
        }
      });
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

  add() {
    const dialogRef = this.dialog.open(DetailItemDialogComponent, {
      width: '550px',
      data: { new: true, item: {childId: this.childId} }
    });

    dialogRef.afterClosed().pipe(
      take(1),
      filter(res => res),
      flatMap(result => this.listService.postGift(result))
    ).subscribe(result =>
      this.gifts.push(result)
    );
  }

  drop(event) {
    moveItemInArray(this.gifts, event.previousIndex, event.currentIndex);
    for (let index = 0; index < this.gifts.length; index++) {
      const gift = this.gifts[index];
      this.listService
        .putGift({ ...gift, ordre: index })
        .pipe(take(1))
        .subscribe(
          result => {
            console.log('reorder');
          },
          err =>
            console.error('api error')
        );
    }
  }

  confimDialog(currentItem: ItemList, check: boolean): void {
    if (check) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: { item: currentItem, check: check }
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
    } else if (this.loginService.hasRole('admin')) {
      this.listService.putGift({ ...currentItem, santaName: '' }).subscribe(result => {
        this.gifts = this.gifts.map(item => {
          if (item.id === currentItem.id) {
            return result;
          } else {
            return item;
          }
        });
      });
    }
  }

  private loadGifts(childId) {
    this.listService.getGifts(childId).pipe(take(1)).subscribe(result => this.gifts = result);
  }

  ngOnInit() {

  }
}
