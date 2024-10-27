import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {PlaceTypeDto} from "../../model/place-type.model";

@Injectable({providedIn: 'root'})
export class PlaceTypeService {
  private apiUrl = 'http://localhost:9000/api/place-type';

  constructor(private http: HttpClient) {}

  getPlaceTypes(): Observable<PlaceTypeDto[]> {
    return this.http.get<PlaceTypeDto[]>(`${this.apiUrl}/getAll`);
  }
}
