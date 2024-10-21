import { TestBed } from '@angular/core/testing';

import { AttributeDashboardService } from './attribute-dashboard.service';

describe('CategoryDashboardService', () => {
  let service: AttributeDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
