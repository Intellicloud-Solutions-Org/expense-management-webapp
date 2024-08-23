import { TestBed } from '@angular/core/testing';

import { MainExpenseService } from './main-expense.service';

describe('MainExpenseService', () => {
  let service: MainExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
