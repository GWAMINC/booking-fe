import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingStatusDto } from '../../../model/booking-status.dto'; // Đảm bảo sử dụng đúng model

@Injectable({
  providedIn: 'root'
})
export class BookingStatusService {

  private apiUrl = 'http://localhost:9000/api/booking-statuses'; 

  constructor(private http: HttpClient) {}

  // Lấy tất cả trạng thái booking
  getAllBookingStatuses(): Observable<BookingStatusDto[]> {
    return this.http.get<BookingStatusDto[]>(this.apiUrl);
  }

  // Tạo trạng thái booking mới
  createBookingStatus(bookingStatus: BookingStatusDto): Observable<BookingStatusDto> {
    return this.http.post<BookingStatusDto>(this.apiUrl, bookingStatus);
  }

  // Cập nhật trạng thái booking
  updateBookingStatus(bookingStatus: BookingStatusDto): Observable<BookingStatusDto> {
    return this.http.put<BookingStatusDto>(`${this.apiUrl}/${bookingStatus.id}`, bookingStatus);
  }

  // Xóa trạng thái booking
  deleteBookingStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
