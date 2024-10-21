import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeDashboardService {
  private apiUrl = 'http://localhost:9000/api/property-attribute/attribute';
  constructor(private http: HttpClient) {}

  createAttribute(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, category);
  }

  getAttributes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  updateAttribute(id : number, attribute : any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update/${id}`, attribute);
  }
  deleteAttribute(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
