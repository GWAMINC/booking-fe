import { Component, OnInit } from '@angular/core';
import { BookingStatusService } from './booking-status.service';
import { BookingStatusDto } from '../../../model/booking-status.dto'; 
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common'; 

@Component({
  selector: 'app-booking-status',
  standalone: true, 
  imports: [NgFor, NgIf, FormsModule], 
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.scss']
})
export class BookingStatusComponent implements OnInit {

  bookingStatuses: BookingStatusDto[] = [];
  newBookingStatus: BookingStatusDto = new BookingStatusDto();  
  selectedBookingStatus: BookingStatusDto | null = null;

  constructor(private bookingStatusService: BookingStatusService) { }

  ngOnInit(): void {
    this.getAllBookingStatuses();
  }

  // Lấy tất cả các trạng thái booking
  getAllBookingStatuses(): void {
    this.bookingStatusService.getAllBookingStatuses().subscribe(
      (data: BookingStatusDto[]) => {
        this.bookingStatuses = data;
      },
      error => {
        console.error('Có lỗi khi tải trạng thái booking!', error);
      }
    );
  }

  // Tạo trạng thái booking mới
  createBookingStatus(): void {
    this.bookingStatusService.getAllBookingStatuses().subscribe({
      next: (data: BookingStatusDto[]) => {
        this.bookingStatuses = data;
      },
      error: (error) => {
        console.error('Có lỗi khi tải trạng thái booking!', error);
      }
    });
  }

  updateBookingStatus(): void {
    if (this.selectedBookingStatus && this.selectedBookingStatus.id !== null) {
      this.bookingStatusService.updateBookingStatus(this.selectedBookingStatus).subscribe(
        (data: BookingStatusDto) => {
          const index = this.bookingStatuses.findIndex(status => status.id === data.id);
          if (index !== -1) {
            this.bookingStatuses[index] = data; // Cập nhật trạng thái trong danh sách
            this.selectedBookingStatus = null; // Reset selectedBookingStatus
          }
        },
        error => {
          console.error('Có lỗi khi cập nhật trạng thái booking!', error);
        }
      );
    } else {
      console.error('ID không hợp lệ!');
    }
  }

  // Xóa trạng thái booking
  deleteBookingStatus(id: number | null): void {
    if (id !== null) {
      this.bookingStatusService.deleteBookingStatus(id).subscribe(
        () => {
          this.bookingStatuses = this.bookingStatuses.filter(status => status.id !== id); // Xóa trạng thái khỏi danh sách
        },
        error => {
          console.error('Có lỗi khi xóa trạng thái booking!', error);
        }
      );
    } else {
      console.error('ID không hợp lệ!');
    }
  }

  // Chọn trạng thái để chỉnh sửa
  selectBookingStatus(status: BookingStatusDto): void {
    this.selectedBookingStatus = { ...status }; // Sao chép đối tượng để chỉnh sửa
  }

  // Deselect trạng thái
  deselectBookingStatus(): void {
    this.selectedBookingStatus = null;
  }
}