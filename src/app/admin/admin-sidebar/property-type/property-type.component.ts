import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {PropertyTypeDto} from "../../../model/property-type.model";
import {PropertyTypeService} from "./property-type.service";
import {AsyncPipe} from "@angular/common";
import {Subscription} from "rxjs";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.scss'
})
export class PropertyTypeComponent implements OnInit,OnDestroy{
  propertyTypes: PropertyTypeDto[] = [];




  private subscription: Subscription = new Subscription();

  constructor(private propertyTypeService: PropertyTypeService) {}

  ngOnInit() {

      this.getPropertyTypes()

  }

  getPropertyTypes() {
    this.subscription.add(
      this.propertyTypeService.getPropertyTypes().subscribe({
        next: (response) => {
          this.propertyTypes = response.map((propertyType:any)=>({
            ...propertyType,
            isEditing: false,
            isUpdating: false
          }));
        },
        error:(error)=>{
          console.error('Error fetching propertyTypes', error);
        }
      })
    );
  }
  addPropertyType() {
    this.propertyTypes.push({ id: 0, typeName: '', isEditing: true, isUpdating: false });
  }

  createPropertyType(index: number): void {
    if (this.propertyTypes[index].typeName.trim().length===0){
      alert("Please enter a type name");
      return;
    }
    this.subscription.add(
      this.propertyTypeService.createPropertyType(this.propertyTypes[index]).subscribe({
        next: (response) => {
          this.propertyTypes[index] = response;
          this.propertyTypes[index].isEditing = false;
          alert('Create type successfully');
        },
        error: (error) => {
          console.error('Error creating type', error);
          alert('Error creating type');
        }
      })
    );

  }




  cancelupdPropertyType(index: number) {
    const propertyType = this.propertyTypes.find((pt) => pt.id === index);
    if (propertyType) {
      propertyType.isEditing = false;
      propertyType.isUpdating = false;
    }
  }

  updatePropertyType(index: number) {
    this.propertyTypes[index].isEditing = true;
    this.propertyTypes[index].isUpdating = true;
  }

  savepropertyType(index: number) {
    if (this.propertyTypes[index].typeName.trim() === '') {
      alert('Type name can not be empty');
      return;
    }
    this.subscription.add(
      this.propertyTypeService.updatePropertyType(this.propertyTypes[index].id, this.propertyTypes[index]).subscribe({
        next: (response) => {
          this.propertyTypes[index].isEditing = false;
          this.propertyTypes[index].isUpdating = false;
          alert("Edit type success!");
        },
        error: (error) => {
          console.error('Error updating type', error);
          alert(error.message)
        }
      })
    );
  }

  deletePropertyType(index: number) {
    this.subscription.add(
      this.propertyTypeService.deletePropertyType(this.propertyTypes[index].id).subscribe({
        next: () => {
          this.propertyTypes.splice(index, 1);
          alert('Xóa quốc gia thành công');
        },
        error: (error) => {
          console.error('Error deleting country', error);
          alert(error.message)
        }
      })
    );
  }




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
