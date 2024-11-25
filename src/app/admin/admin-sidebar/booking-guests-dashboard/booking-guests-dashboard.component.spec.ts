import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingGuestsDashboardComponent } from './booking-guests-dashboard.component';

describe('BookingGuestsDashboardComponent', () => {
  let component: BookingGuestsDashboardComponent;
  let fixture: ComponentFixture<BookingGuestsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingGuestsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingGuestsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
