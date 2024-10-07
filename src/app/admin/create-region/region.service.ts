import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionDto } from '../../model/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'http://localhost:9000/api/region';

  constructor(private http: HttpClient) {}

  createRegion(region: RegionDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, region);
  }
}
