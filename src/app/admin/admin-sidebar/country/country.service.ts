// src/app/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryDto } from '../../../model/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://localhost:9000/api/country';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  getCountriesByRegionId(regionId: number): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${this.apiUrl}/getByRegionId/${regionId}`);
  }

  createCountry(country: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, country);
  }

  updateCountry(id: number, country: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateById/${id}`, country);
  }

  deleteCountry(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteById/${id}`);
  }
}
