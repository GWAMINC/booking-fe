import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingDashboardService } from './booking-dashboard.service';
import { BookingDto } from '../../../model/booking.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './booking-dashboard.component.html',
  styleUrls: ['./booking-dashboard.component.scss']
})
export class BookingDashboardComponent implements OnInit, OnDestroy {
  bookings: BookingDto[] = [];
  bookingForm: FormGroup;
  isEditing: boolean = false;
  editingBookingId: number | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private bookingService: BookingDashboardService,
    private formBuilder: FormBuilder
  ) {
    this.bookingForm = this.formBuilder.group({
      propertyId: [''],
      userId: [''],
      checkinDate: [''],
      checkoutDate: [''],
      nightlyPrice: [''],
      serviceFee: [''],
      cleaningFee: [''],
      totalPrice: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.subscription.add(
      this.bookingService.getAllBookings().subscribe({
        next: (data: BookingDto[]) => {
          this.bookings = data;
        },
        error: (error) => {
          console.error('Error fetching bookings', error);
        }
      })
    );
  }

  createBooking(): void {
    const newBooking: BookingDto = this.bookingForm.value;
    this.subscription.add(
      this.bookingService.createBooking(newBooking).subscribe({
        next: () => {
          this.loadBookings();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating booking', error);
        }
      })
    );
  }

  editBooking(booking: BookingDto): void {
    this.isEditing = true;
    this.editingBookingId = booking.id;
    this.bookingForm.patchValue(booking);
  }

  updateBooking(): void {
    if (this.editingBookingId !== null) {
      const updatedBooking: BookingDto = { ...this.bookingForm.value, id: this.editingBookingId };
      this.subscription.add(
        this.bookingService.updateBooking(this.editingBookingId, updatedBooking).subscribe({
          next: () => {
            this.loadBookings();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating booking', error);
          }
        })
      );
    }
  }

  deleteBooking(id: number): void {
    this.subscription.add(
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.loadBookings();
        },
        error: (error) => {
          console.error('Error deleting booking', error);
        }
      })
    );
  }

  resetForm(): void {
    this.bookingForm.reset();
    this.isEditing = false;
    this.editingBookingId = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
