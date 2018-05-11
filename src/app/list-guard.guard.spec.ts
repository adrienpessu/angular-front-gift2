import { TestBed, async, inject } from '@angular/core/testing';

import { ListGuardGuard } from './list-guard.guard';

describe('ListGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListGuardGuard]
    });
  });

  it('should ...', inject([ListGuardGuard], (guard: ListGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
