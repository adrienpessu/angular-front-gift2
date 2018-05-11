import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGroupGuard } from './admin-group.guard';

describe('AdminGroupGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGroupGuard]
    });
  });

  it('should ...', inject([AdminGroupGuard], (guard: AdminGroupGuard) => {
    expect(guard).toBeTruthy();
  }));
});
