import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PropertyDto } from '../../../model/property.model'; // Đảm bảo đường dẫn đúng tới model

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private apiUrl = 'http://localhost:9000/api/property';

  constructor(private http: HttpClient) {}

  // Lấy tất cả các property
  getProperties(): Observable<PropertyDto[]> {
    return this.http.get<PropertyDto[]>(`${this.apiUrl}/getAll`);
  }

  // Lấy property theo ID
  getPropertyById(id: number): Observable<PropertyDto> {
    return this.http.get<PropertyDto>(`${this.apiUrl}/getById/${id}`);
  }

  // Tạo property mới
  createProperty(property: PropertyDto): Observable<PropertyDto> {
    return this.http.post<PropertyDto>(`${this.apiUrl}/create`, property);
  }

  // Cập nhật property theo ID
  updateProperty(id: number, property: PropertyDto): Observable<PropertyDto> {
    return this.http.post<PropertyDto>(`${this.apiUrl}/updateById/${id}`, property);
  }

  // Xóa property theo ID
  deleteProperty(id: number): Observable<PropertyDto> {
    return this.http.delete<PropertyDto>(`${this.apiUrl}/deleteById/${id}`);
  }
}
