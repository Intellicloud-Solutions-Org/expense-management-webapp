import { TestBed } from '@angular/core/testing';

import { OfficeExpenseService } from './office-expense.service';

describe('OfficeExpenseService', () => {
  let service: OfficeExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
