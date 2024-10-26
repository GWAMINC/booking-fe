import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceTypeDto } from '../../../model/place-type.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceTypeService {
  private apiUrl = 'http://localhost:9000/api/place-type';

  constructor(private http: HttpClient) {}

  getPlaceTypes(): Observable<PlaceTypeDto[]> {
    return this.http.get<PlaceTypeDto[]>(`${this.apiUrl}/getAll`);
  }

  addPlaceType(placeType: PlaceTypeDto): Observable<PlaceTypeDto> {
    return this.http.post<PlaceTypeDto>(`${this.apiUrl}/create`, placeType);
  }

  deletePlaceType(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteById/${id}`);
  }

  updatePlaceType(placeType: PlaceTypeDto): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/updateById/${placeType.id}`,
      placeType
    );
  }
}
