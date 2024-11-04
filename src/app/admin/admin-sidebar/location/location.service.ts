import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:9000/api/location';

  constructor(private http:HttpClient) { }

  getLocations():Observable<any>{
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  createLocation(location:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/create`,location);
  }

  updateLocation(id:number,location:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/updateById/${id}`,location);
  }
  deleteLocation(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteById/${id}`);
  }

}
