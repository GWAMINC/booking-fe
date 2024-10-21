import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from '../../../../model/category.model';
import { CategoryService } from '../category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[app-category-row]',
  standalone: true,
  templateUrl: './category-row.component.html',
  styleUrl: './category-row.component.scss',
  imports: [FormsModule],
})
export class CategoryRowComponent {
  @Input() category: CategoryDto = {
    id: 0,
    categoryName: '',
  };

  @Output() deleteCategoryEvent = new EventEmitter<number>();
  @Output() updateCategoryEvent = new EventEmitter();

  constructor(private categoryService: CategoryService) {}

  isEditing: boolean = false;
  oldCategoryName: string = '';

  deleteCategory() {
    this.deleteCategoryEvent.emit(this.category.id);
  }

  editCategory() {
    this.isEditing = true;
    this.oldCategoryName = this.category.categoryName;
  }

  updateCategory() {
    this.updateCategoryEvent.emit(this.category);
    this.isEditing = false;
    alert("Update category successfully!");
  }

  cancelEditCategory() {
    this.category.categoryName = this.oldCategoryName;
    this.isEditing = false;
  }
}
