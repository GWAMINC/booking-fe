import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {AsyncPipe} from "@angular/common";
import {Subscription} from "rxjs";
import {NgFor, NgIf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";

import {PlaceTypeDto} from "../../model/place-type.model";
import {PlaceTypeService} from "./place-type.service";

@Component({
  selector: 'app-place-type',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './place-type.component.html',
  styleUrl: './place-type.component.scss'
})
export class PlaceTypeComponent {
  placeTypes: PlaceTypeDto[] = [];

  placeType: PlaceTypeDto = {
    id:0,
    typeName:"",
  }

  private subscription: Subscription = new Subscription();
  constructor(private placeTypeService: PlaceTypeService) {}

  ngOnInit(): void {
    this.placeTypeService
    .getPlaceTypes()
      .subscribe((placeTypes)=>(this.placeTypes = placeTypes));

  }

  getPlaceTypes(): void {
    this.subscription.add(
      this.placeTypeService.getPlaceTypes().subscribe({
        next: (response) => {
          this.placeTypes=response.map((PlaceType:PlaceTypeDto)=>({
            ...PlaceType,
            isEditing:false,
            isUpdating:false
          }));
        },
        error: (error)=>{
          console.log("Error fetching placeTypes",error)}
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
