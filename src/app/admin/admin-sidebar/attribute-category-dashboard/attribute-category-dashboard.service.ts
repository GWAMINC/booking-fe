import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttributeCategoryDto } from "../../../model/attribute-category.model";
@Injectable({
  providedIn: 'root'
})
export class AttributeCategoryDashboardService {
  private apiUrl = 'http://localhost:9000/api/property-attribute/category';
  constructor(private http: HttpClient) {}

  createCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, category);
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }
  updateCategory(id: number,category : any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update/${id}`,category);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
