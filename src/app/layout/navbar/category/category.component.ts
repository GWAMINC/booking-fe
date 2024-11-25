import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryService } from '../../../shared/service/category.service';
import { Category } from './category.model';
import { CategoryDto } from '../../../model/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categories!: Category[];

  // currentActivateCategory = this.categoryService.getCategoryByDefault();

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  private fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categoryDtos: CategoryDto[]) => {
        this.categories = categoryDtos.map<Category>((categoryDto) => {
          let technicalName = categoryDto.categoryName.replace(
            /[^a-z0-9]/gi,
            ' '
          );
          technicalName = technicalName.replace(/\s+/g, '_').toUpperCase();

          return {
            icon: 'eye',
            displayName: categoryDto.categoryName,
            technicalName,
            activated: false,
          };
        });
      },
      error: (e) => console.log('Get categories failed: ', e),
    });
  }
}
