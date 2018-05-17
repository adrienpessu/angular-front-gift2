import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemDialogComponent } from './detail-item-dialog.component';

describe('DetailItemDialogComponent', () => {
  let component: DetailItemDialogComponent;
  let fixture: ComponentFixture<DetailItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
