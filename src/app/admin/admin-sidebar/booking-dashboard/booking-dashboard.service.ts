import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDto } from '../../../model/booking.dto'; 

@Injectable({
  providedIn: 'root'
})
export class BookingDashboardService {
  private apiUrl = 'http://localhost:9000/api/bookings';

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<BookingDto[]> {
    return this.http.get<BookingDto[]>(this.apiUrl);
  }

  createBooking(booking: BookingDto): Observable<BookingDto> {
    return this.http.post<BookingDto>(this.apiUrl, booking);
  }

  updateBooking(id: number, booking: BookingDto): Observable<BookingDto> {
    return this.http.put<BookingDto>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
