import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingGuest } from '../../../model/booking-guests-dashboard.model';
@Injectable({
  providedIn: 'root'
})
export class BookingGuestsService {
  private apiUrl = 'http://localhost:9000/api/booking-guests';

  constructor(private http: HttpClient) {}

  getBookingGuests(): Observable<BookingGuest[]> {
    return this.http.get<BookingGuest[]>(this.apiUrl);
  }

  getBookingGuestById(id: number): Observable<BookingGuest> {
    return this.http.get<BookingGuest>(`${this.apiUrl}/${id}`);
  }

  createBookingGuest(bookingGuest: BookingGuest): Observable<BookingGuest> {
    return this.http.post<BookingGuest>(this.apiUrl, bookingGuest);
  }

  updateBookingGuest(id: number, bookingGuest: BookingGuest): Observable<BookingGuest> {
    return this.http.put<BookingGuest>(`${this.apiUrl}/${id}`, bookingGuest);
  }

  deleteBookingGuest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
