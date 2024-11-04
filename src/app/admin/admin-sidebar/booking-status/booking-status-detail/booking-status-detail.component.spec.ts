import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatusDetailComponent } from './booking-status-detail.component';

describe('BookingStatusDetailComponent', () => {
  let component: BookingStatusDetailComponent;
  let fixture: ComponentFixture<BookingStatusDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStatusDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
