// src/app/region.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionDto } from '../../../model/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'http://localhost:9000/api/region';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<RegionDto[]> {
    return this.http.get<RegionDto[]>(`${this.apiUrl}/getAll`);
  }

  getRegionById(id: number): Observable<RegionDto> {
    return this.http.get<RegionDto>(`${this.apiUrl}/getById/${id}`);
  }

  createRegion(region: RegionDto): Observable<RegionDto> {
    return this.http.post<RegionDto>(`${this.apiUrl}/create`, region);
  }

  updateRegion(id: number, region: RegionDto): Observable<RegionDto> {
    console.log(region)
    return this.http.post<RegionDto>(`${this.apiUrl}/updateById/${id}`, region);
  }

  deleteRegion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteById/${id}`);
  }
}
