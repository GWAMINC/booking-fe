import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingGuestsService } from './booking-guests-dashboard.service';
import { BookingGuest } from '../../../model/booking-guests-dashboard.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-guests-dashboard',
  standalone: true,
  imports: [NgFor, NgIf ,FormsModule],
  templateUrl: './booking-guests-dashboard.component.html',
  styleUrls: ['./booking-guests-dashboard.component.scss']
})
export class BookingGuestsDashboardComponent implements OnInit, OnDestroy {
  bookingGuests: BookingGuest[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private bookingGuestsService: BookingGuestsService) {}

  ngOnInit() {
    this.getBookingGuests();
  }

  getBookingGuests() {
    this.subscription.add(
      this.bookingGuestsService.getBookingGuests().subscribe({
        next: (response) => {
          this.bookingGuests = response.map(guest => ({ ...guest, isEditing: false }));
        },
        error: (error) => {
          console.error('Error fetching booking guests', error);
        }
      })
    );
  }

  addBookingGuest() {
    this.bookingGuests.push({ id: null, bookingId: null, guestTypeId: null, numGuests: 0, isEditing: true });
  }

  createBookingGuest(index: number) {
    if (this.bookingGuests[index].numGuests <= 0) {
      alert('Số lượng khách không được để trống');
      return;
    }
    this.subscription.add(
      this.bookingGuestsService.createBookingGuest(this.bookingGuests[index]).subscribe({
        next: (response) => {
          this.bookingGuests[index] = response;
          this.bookingGuests[index].isEditing = false;
          alert("Tạo thành công!");
        },
        error: (error) => {
          console.error('Error creating booking guest', error);
          alert(error.message);
        }
      })
    );
  }

  updateBookingGuest(index: number) {
    this.bookingGuests[index].isEditing = true;
  }

  saveBookingGuest(index: number) {
    if (this.bookingGuests[index].numGuests <= 0) {
      alert('Số lượng khách không được để trống');
      return;
    }
    const guestId = this.bookingGuests[index].id;
    if (guestId !== null) {
      this.subscription.add(
        this.bookingGuestsService.updateBookingGuest(guestId, this.bookingGuests[index]).subscribe({
          next: (response) => {
            this.bookingGuests[index] = response;
            this.bookingGuests[index].isEditing = false;
            alert("Sửa thành công!");
          },
          error: (error) => {
            console.error('Error updating booking guest', error);
            alert(error.message);
          }
        })
      );
    }
  }

  deleteBookingGuest(index: number) {
    const guestId = this.bookingGuests[index].id;
    if (guestId !== null) {
      this.subscription.add(
        this.bookingGuestsService.deleteBookingGuest(guestId).subscribe({
          next: () => {
            this.bookingGuests.splice(index, 1);
            alert("Xóa thành công!");
          },
          error: (error) => {
            console.error('Error deleting booking guest', error);
            alert(error.message);
          }
        })
      );
    } else {
      this.bookingGuests.splice(index, 1);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
