import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryDto } from '../../../model/category.model';
import { CategoryService } from './category.service';
import { AsyncPipe } from '@angular/common';
import { CategoryRowComponent } from './category-row/category-row.component';

@Component({
  selector: 'app-category-dashboard',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CategoryRowComponent],
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
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  addCategory() {
    if (this.category.categoryName.trim().length === 0) {
      alert('Please enter category name');
    } else {
      this.categoryService
        .createCategory(this.category)
        .subscribe((newCategory) => {
          this.categories = [...this.categories, newCategory];
        });

      alert('Create category successfully!');
    }

    this.category.categoryName = '';
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe((res) => {
      let confirmDelete: boolean = confirm(
        `Confirm delete category with id ${id}?`
      );

      if (confirmDelete) {
        this.categories = this.categories.filter(
          (category) => category.id !== id
        );
        alert('Delete category successfully!');
      }
    });
  }

  updateCategory(categoryDto: CategoryDto) {
    this.categoryService
      .updateCategory(categoryDto)
      .subscribe((newCategory) => {
        this.categories = this.categories.map((category) => {
          if (category.id === newCategory.id) return newCategory;
          return category;
        });
      });
  }
}
