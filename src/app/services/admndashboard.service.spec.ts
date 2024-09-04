import { TestBed } from '@angular/core/testing';

import { AdmndashboardService } from './admndashboard.service';

describe('AdmndashboardService', () => {
  let service: AdmndashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmndashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
