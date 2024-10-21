import { TestBed } from '@angular/core/testing';

import { AttributeCategoryDashboardService } from './attribute-category-dashboard.service';

describe('AttributeCategoryDashboardService', () => {
  let service: AttributeCategoryDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeCategoryDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
