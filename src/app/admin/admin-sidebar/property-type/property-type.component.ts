import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {PropertyTypeDto} from "../../../model/property-type.model";
import {PropertyTypeService} from "./property-type.service";
import {AsyncPipe} from "@angular/common";
import {Subscription} from "rxjs";
import {NgFor, NgIf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.scss'
})
export class PropertyTypeComponent implements OnInit,OnDestroy{
  propertyTypes: PropertyTypeDto[] = [];

  propertyType: PropertyTypeDto={
    id:0,
    typeName:'',
  };



  private subscription: Subscription = new Subscription();

  constructor(private propertyTypeService: PropertyTypeService) {}

  ngOnInit() {
    this.propertyTypeService
      .getPropertyTypes()
      .subscribe((propertyTypes)=>(this.propertyTypes = propertyTypes));
  }

  getPropertyTypes() {
    this.subscription.add(
      this.propertyTypeService.getPropertyTypes().subscribe({
        next: (response) => {
          this.propertyTypes = response.map((propertyType:PropertyTypeDto)=>({
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
    if (this.propertyType.typeName.trim().length === 0) {
      alert('Please enter category name');
    } else {
      this.propertyTypeService
        .createPropertyTypes(this.propertyType)
        .subscribe((newPropertyType) => {
          this.propertyTypes = [...this.propertyTypes, newPropertyType];

        });
      console.log(this.propertyType.id,this.propertyType.typeName)

      alert('Create category successfully!');
    }

    this.propertyType.typeName = '';
  }


  updatePropertyType(id: number) {
    const propertyType = this.propertyTypes.find((pt) => pt.id === id);
    if (propertyType) {
      propertyType.isEditing = true;
      propertyType.isUpdating = true;
    }
    console.log(propertyType?.typeName, propertyType?.id);
  }

  cancelupdPropertyType(id: number) {
    const propertyType = this.propertyTypes.find((pt) => pt.id === id);
    if (propertyType) {
      propertyType.isEditing = false;
      propertyType.isUpdating = false;
    }
  }

  savePropertyType(id: number) {
    const propertyType = this.propertyTypes.find(pt => pt.id === id);
    if (propertyType) {
      if (propertyType.typeName.trim() === '') {
        alert('Type name is required');
        return;
      }
      this.subscription.add(
        this.propertyTypeService.updatePropertyTypes(propertyType.id, propertyType).subscribe({
          next: () => {
            propertyType.isEditing = false;
            propertyType.isUpdating = false;
          },
          error: (error) => {
            console.error('Error updating property type', error);
          }
        })
      );
    }
  }

  deletePropertyType(id: number): void {
    this.propertyTypeService.deletePropertyTypes(id).subscribe(()=>{
      let comfirmDelete: boolean = confirm("Are you sure you want to delete?");

      if (comfirmDelete) {
        this.propertyTypes=this.propertyTypes.filter(
          (propertyType)=> propertyType.id !== id
        );
        alert("Delete property type successfully!");

      }
    })
  }




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
