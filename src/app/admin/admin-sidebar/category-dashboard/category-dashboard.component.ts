import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryDto } from '../../../model/category.model';
import { CategoryService } from '../../../shared/service/category.service';
import { CategoryRowComponent } from './category-row/category-row.component';

@Component({
  selector: 'app-category-dashboard',
  standalone: true,
  imports: [FormsModule, CategoryRowComponent],
  templateUrl: './category-dashboard.component.html',
  styleUrl: './category-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CategoryDashboardComponent {
  categories!: CategoryDto[];

  category: CategoryDto = {
    id: 0,
    categoryName: '',
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (e) => console.log('Get categories failed: ', e),
    });
  }

  addCategory() {
    if (this.category.categoryName.trim().length === 0) {
      alert('Please enter category name');
    } else {
      this.categoryService.createCategory(this.category).subscribe({
        next: (newCategory) => {
          this.categories = [...this.categories, newCategory];
          this.category.categoryName = '';
        },
        error: (e) => console.log('Create category failed: ', e),
      });
    }
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () =>
        (this.categories = this.categories.filter(
          (category) => category.id !== id
        )),
      error: (e) => {
        console.log('Delete category failed: ', e);
        alert(e.error.message);
      },
    });
  }

  updateCategory(newCategory: CategoryDto) {
    this.categoryService.updateCategory(newCategory).subscribe({
      next: () =>
        (this.categories = this.categories.map((category) => {
          if (category.id === newCategory.id) return newCategory;
          return category;
        })),
      error: (e) => console.log('Update category failed: ', e),
    });
  }
}
