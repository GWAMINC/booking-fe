import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import { NgFor , NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {AttributeDashboardService} from "./attribute-dashboard.service";
import {AttributeCategoryDashboardService} from "../attribute-category-dashboard/attribute-category-dashboard.service";
import {AttributeDto} from "../../../model/attribute.model";
import {AttributeCategoryDto} from "../../../model/attribute-category.model";

@Component({
  selector: 'app-category-dashboard',
  standalone: true,
  imports: [NgFor, NgIf ,FormsModule ],
  templateUrl: './attribute-dashboard.component.html',
  styleUrl: './attribute-dashboard.component.scss'
})
export class AttributeDashboardComponent implements OnDestroy, OnInit {
  private subscription: Subscription = new Subscription();
  attributes: AttributeDto[] = [];
  categories: AttributeCategoryDto[] = [];
  constructor(private attributeDashboardService: AttributeDashboardService,
              private attributeCategoryDashboardService: AttributeCategoryDashboardService) {}
  ngOnInit() {
    this.getAttributes();
    this.getCategories();
  }
  getCategories() {
    this.subscription.add(
      this.attributeCategoryDashboardService.getCategories().subscribe({
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
  getAttributes() {
    this.subscription.add(
      this.attributeDashboardService.getAttributes().subscribe({
        next: (response) => {
          this.attributes = response.map((attribute : any) => ({
            ...attribute,
            isEditing: false,
            isUpdating: false
          }));
          console.log('Attributes', this.attributes);
        },
        error: (error) => {
          console.error('Error fetching attributes', error);
          alert('Error fetching attributes');
        }
      })
    );
  }
  addAttribute() {
    const {isEditing, isUpdating, ...rest} = this.categories[0];
    const temp = rest;
    this.attributes.push({id : 0, name: '', description: '', attributeCategory: rest, isEditing: true, isUpdating: false});
  }

  createAttribute(index : number) {
    if (this.attributes[index].name.trim() === '' || this.attributes[index].description.trim() === '') {
      alert('Please fill in all the fields');
      return;
    }
    this.subscription.add(
      this.attributeDashboardService.createAttribute(this.attributes[index]).subscribe({
        next: (response) => {
          this.attributes[index] = response;
          this.attributes[index].isEditing = false;
        },
        error: (error) => {
          console.error('Error creating attribute', error);
          alert('Error creating attribute');
        }
      })
    );
  }
  updateAttribute(index: number) {
    this.attributes[index].isUpdating = true;
    this.attributes[index].isEditing = true;
  }
  saveAttribute(index: number) {
    if (this.attributes[index].name.trim() === '' || this.attributes[index].description.trim() === '') {
      alert('Please fill in all the fields');
      return;
    }
    this.subscription.add(
      this.attributeDashboardService.updateAttribute(this.attributes[index].id, this.attributes[index]).subscribe({
        next: (response) => {
          this.attributes[index].isEditing = false;
          this.attributes[index].isUpdating = false;
        },
        error: (error) => {
          console.error('Error updating attribute', error);
          alert('Error updating attribute');
        }
      })
    );
  }

  deleteAttribute(index: number) {
    this.subscription.add(
      this.attributeDashboardService.deleteAttribute(this.attributes[index].id).subscribe({
        next: () => {
          this.attributes.splice(index, 1);
        },
        error: (error) => {
          console.error('Error deleting attribute', error);
          alert('Error deleting attribute');
        }
      })
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

