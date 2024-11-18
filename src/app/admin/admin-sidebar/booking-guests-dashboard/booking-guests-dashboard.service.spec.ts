import { TestBed } from '@angular/core/testing';

import { BookingGuestsService } from './booking-guests-dashboard.service';

describe('BookingGuestsDashboardService', () => {
  let service: BookingGuestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingGuestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
