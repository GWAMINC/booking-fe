import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatusCreateComponent } from './booking-status-create.component';

describe('BookingStatusCreateComponent', () => {
  let component: BookingStatusCreateComponent;
  let fixture: ComponentFixture<BookingStatusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStatusCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingStatusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
