import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import { NgFor , NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {AttributeCategoryDashboardService} from "../attribute-category-dashboard/attribute-category-dashboard.service";
import {AttributeCategoryDto} from "../../../model/attribute-category.model";

@Component({
  selector: 'app-attribute-category-dashboard',
  standalone: true,
  imports: [NgFor, NgIf ,FormsModule ],
  templateUrl: './attribute-category-dashboard.component.html',
  styleUrl: './attribute-category-dashboard.component.scss'
})
export class AttributeCategoryDashboardComponent implements OnDestroy , OnInit{
  private subscription: Subscription = new Subscription();
  categories: AttributeCategoryDto[]  = [];
  constructor(private attributeDashboardService: AttributeCategoryDashboardService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.subscription.add(
      this.attributeDashboardService.getCategories().subscribe({
        next: (response) => {
          this.categories = response.map((category : AttributeCategoryDto) => ({...category,isEditing: false,isUpdating: false}));
          console.log('Categories', this.categories);
        },
        error: (error) => {
          console.error('Error fetching categories', error);
          alert('Error fetching categories');
        }
      })
    );
  }

  addCategory() {
    this.categories.push({ id: 0, name: '', isEditing: true, isUpdating: false});
  }

  createCategory(index : number) {
    if (this.categories[index].name.trim() === '') {
      alert('Tên attribute không được để trống');
      return;
    }
    else {
      this.subscription.add(
        this.attributeDashboardService.createCategory(this.categories[index]).subscribe({
          next: (response) => {
            console.log('Category created successfully');
            this.categories[index] = response;
            this.categories[index].isEditing = false;
          },
          error: (error) => {
            console.error('Error creating category', error);
            alert('Error creating category');
          }
        })
      );
    }
    this.categories[index].isEditing = false;
  }
  updateCategory(index: number) {
    this.categories[index].isEditing = true;
    this.categories[index].isUpdating = true;
  }
  saveCategory(index: number) {
    if (this.categories[index].name.trim() === '') {
      alert('Tên attribute không được để trống');
      return;
    }
    this.subscription.add(
      this.attributeDashboardService.updateCategory(this.categories[index].id, this.categories[index]).subscribe({
        next: (response) => {
          console.log('Category updated successfully');
          this.categories[index].isEditing = false;
          this.categories[index].isUpdating = false;
        },
        error: (error) => {
          console.error('Error updating category', error);
          alert('Error updating category');
        }
      })
    );
  }

  deleteCategory(index: number) {
    console.log('Category deleted successfully1',this.categories[index].name,this.categories[index].id,index);
    this.subscription.add(
      this.attributeDashboardService.deleteCategory(this.categories[index].id).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error('Error deleting category', error);
          alert('Error deleting category');
        }
      })
    );
    this.categories.splice(index, 1);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

