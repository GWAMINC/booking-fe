import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from '../../../model/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:9000/api/product-category/category';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/getAll`);
  }

  createCategory(category: CategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(`${this.apiUrl}/create`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteById/${id}`);
  }

  updateCategory(categoryDto: CategoryDto): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/updateById/${categoryDto.id}`,
      categoryDto
    );
  }
}
