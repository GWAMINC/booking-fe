import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PropertyService } from "./property.service";
import { PropertyDto } from "../../../model/property.model";
import {PropertyTypeService} from "../property-type/property-type.service";
import {PropertyTypeDto} from "../../../model/property-type.model";
import {CountryDto} from "../../../model/country.model";
import {CountryService} from "../country/country.service";
import {PlaceTypeDto} from "../../../model/place-type.model";
import {PlaceTypeService} from "../place-type-dashboard/place-type.service";

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnDestroy, OnInit {

  private subscription: Subscription = new Subscription();
  properties: PropertyDto[] = [];
  propertyTypes: PropertyTypeDto[] = [];
  countries: CountryDto[]=[];
  placeTypes: PlaceTypeDto[] = [];
  constructor(private propertyService: PropertyService,
              private propertyTypeService: PropertyTypeService,
              private countryService: CountryService,
              private placeTypeService: PlaceTypeService,) {
  }
  ngOnInit() {
    this.getProperties();
    this.getPropertyTypes();
    this.getCountries();
    this.getPlaceTypes();
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

  getCountries() {
    this.subscription.add(
      this.countryService.getCountries().subscribe({
        next: (response) => {
          this.countries = response.map((country:CountryDto) => ({ ...country, isEditing: false, isUpdating: false }));
        },
        error: (error) => {
          console.error('Error fetching countries', error);
        }
      })
    );
  }
  getProperties() {
    this.subscription.add(
      this.propertyService.getProperties().subscribe({
        next: (response) => {
          this.properties= response.map((property: PropertyDto)=>(
            {
              ...property,isEditing:false,isUpdating:false
            }
          ));
          console.log('Properties', this.properties);
        },
        error: (error) => {
          console.log("Error fetching properties", error);
          alert('Error fetching properties');
        }
      })
    );
  }

  getPropertyTypes() {
    this.subscription.add(
      this.propertyTypeService.getPropertyTypes().subscribe({
        next: (response) => {
          this.propertyTypes=response.map((propertyType: any)=>({
            ...propertyType,
            isEditing:false,
            isUpdating:false
          }));
          console.log("PropertyTypes", this.propertyTypes);
        },
        error: (error) => {
          console.log("Error fetching propertyTypes",error);
          alert("Error fetching propertyTypes");
        }
      })
    );
  }
  addProperty() {
    const { isEditing: isEditingProperty, isUpdating: isUpdatingProperty, ...sea } = this.propertyTypes[0];
    const { isEditing: isEditingCountry, isUpdating: isUpdatingCountry, ...VN } = this.countries[0];
    const {...city}=this.placeTypes[0];

    this.properties.push({
      id: 0,
      propertyName: "",
      propertyType: sea,
      location: {
        id:1,
        name: "Da Lat",
        country: VN
      },         // Giá trị mặc định cho location
      placeType: city,        // Giá trị mặc định cho placeType
      nightlyPrice: 1,
      numBedrooms: 1,
      numBeds: 1,
      numGuests: 1,
      isGuestFavourite:true,
      description: "",
      addressLine1: "",
      addressLine2: "",
      host: {
        id:1,
        firstName: "",
        lastName:"",
        emailAddress:"",
        password:""
      },             // Giá trị mặc định cho host
      isEditing: true,
      isUpdating: false
    });
  }
  createProperty(index: number) {
    const property = this.properties[index];

    // Kiểm tra các trường cần thiết và gán giá trị mặc định nếu cần
    if (property.propertyName.trim().length === 0) {
      alert("Please fill in the property name.");
      return;
    }
    if (!property.description || property.description.trim().length === 0) {
      property.description = "No description provided";
    }
    if (!property.addressLine1 || property.addressLine1.trim().length === 0) {
      property.addressLine1 = "No address line 1 provided";
    }
    if (!property.addressLine2 || property.addressLine2.trim().length === 0) {
      property.addressLine2 = "No address line 2 provided";
    }
    if (!property.host) {
      alert("Host is required.");
      return;
    }
    if (!property.location || !property.location.id) {
      alert("Location is required.");
      return;
    }
    if (!property.placeType || !property.placeType.id) {
      alert("Place type is required.");
      return;
    }
    if (!property.propertyType || !property.propertyType.id) {
      alert("Property type is required.");
      return;
    }

    // Gửi yêu cầu tạo mới property sau khi kiểm tra và gán giá trị mặc định
    this.subscription.add(
      this.propertyService.createProperty(property).subscribe({
        next: (response) => {
          this.properties[index] = response;
          this.properties[index].isEditing = false;
        },
        error: (error) => {
          console.error('Error creating property', error);
          alert("Error creating property");
        }
      })
    );
  }

  updateProperty(index: number) {
    this.properties[index].isUpdating=true;
    this.properties[index].isEditing=true;
  }

  saveProperty(index: number) {
    if (this.properties[index].propertyName.trim()===''){
      alert("Please fill in all fields");
      return;
    }
    this.subscription.add(
      this.propertyService.updateProperty(this.properties[index].id, this.properties[index]).subscribe({
        next: (response) => {
          this.properties[index]=response;
          this.properties[index].isEditing=false;
          this.properties[index].isUpdating=false;
        },
        error: (error) => {
          console.log("Error updating property", error);
          alert("Error updating property");
        }
      })
    )
  }

  deleteProperty(index: number) {
    this.subscription.add(
      this.propertyService.deleteProperty(this.properties[index].id).subscribe({
        next: () => {
          this.properties.splice(index, 1);
        },
        error: (error) => {
          console.log("Error deleting property", error);
          alert("Error deleting property");
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
