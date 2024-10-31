import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from '../../../../model/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[app-category-row]',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-row.component.html',
  styleUrl: './category-row.component.scss',
})
export class CategoryRowComponent {
  @Input() category: CategoryDto = {
    id: 0,
    categoryName: '',
  };

  @Output() categoryDeleted = new EventEmitter<number>();
  @Output() categoryUpdated = new EventEmitter<CategoryDto>();

  isEditing: boolean = false;
  oldCategoryName: string = '';

  deleteCategory() {
    let confirmDelete: boolean = confirm(
      'Are you sure you want to delete this category?'
    );

    if (confirmDelete) this.categoryDeleted.emit(this.category.id);
  }

  editCategory() {
    this.isEditing = true;
    this.oldCategoryName = this.category.categoryName;
  }

  cancelEditCategory() {
    this.category.categoryName = this.oldCategoryName;
    this.isEditing = false;
  }

  updateCategory() {
    let confirmUpdate: boolean = confirm(
      'Are you sure you want to update this category?'
    );

    if (confirmUpdate) {
      this.categoryUpdated.emit(this.category);
      this.isEditing = false;
    }
  }
}
