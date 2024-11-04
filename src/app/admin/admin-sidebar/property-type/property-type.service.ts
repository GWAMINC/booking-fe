import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PropertyTypeDto} from "../../../model/property-type.model";

@Injectable({providedIn: 'root'})
export class PropertyTypeService {
  private apiUrl = 'http://localhost:9000/api/propertytype'

  constructor(private http: HttpClient) {}

  getPropertyTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  createPropertyType(propertyType: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`,propertyType);
  }

  updatePropertyType(id: number, propertyType: any): Observable<any> {
    console.log(propertyType);
    return this.http.post(`${this.apiUrl}/updateById/${id}`,propertyType);
  }

  deletePropertyType(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteById/${id}`);
  }

}
