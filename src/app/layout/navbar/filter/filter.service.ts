import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private apiUrl = 'http://localhost:9000/api/property-attribute/attribute';
  constructor(private http: HttpClient) {}
  getAttributes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }
}
