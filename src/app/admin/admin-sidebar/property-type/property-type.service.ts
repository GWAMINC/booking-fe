import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PropertyTypeDto} from "../../../model/property-type.model";

@Injectable({providedIn: 'root'})
export class PropertyTypeService {
  private apiUrl = 'http://localhost:9000/api/propertytype'

  constructor(private http: HttpClient) {}

  getPropertyTypes(): Observable<PropertyTypeDto[]> {
    return this.http.get<PropertyTypeDto[]>(`${this.apiUrl}/getAll`);
  }

  createPropertyTypes(propertyType: PropertyTypeDto): Observable<PropertyTypeDto> {
    return this.http.post<PropertyTypeDto>(`${this.apiUrl}/create`,propertyType);
  }

  updatePropertyTypes(id: number, propertyType: PropertyTypeDto): Observable<PropertyTypeDto> {
    console.log(propertyType);
    return this.http.post<PropertyTypeDto>(`${this.apiUrl}/updateById/${id}`,propertyType);
  }

  deletePropertyTypes(id: number): Observable<PropertyTypeDto> {
    return this.http.delete<PropertyTypeDto>(`${this.apiUrl}/deleteById/${id}`);
  }

}
