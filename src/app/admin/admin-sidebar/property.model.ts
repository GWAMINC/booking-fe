import {PropertyTypeDto} from "./property-type.model";
import {PlaceTypeDto} from "./place-type.model";
import {CountryDto} from "./country.model";


export interface PropertyDto{
  id:number;
  propertyName: string;
  location: {
    id: number;
    name: string;
    country: CountryDto;
  };
  placeType:PlaceTypeDto;
  propertyType: PropertyTypeDto;
  nightlyPrice: number;
  numGuests: number;
  numBeds: number;
  numBedrooms: number;
  isGuestFavourite: boolean;
  description: string;
  addressLine1: string;
  addressLine2: string;
  host: {
    id:number;
    firstName: string;
    lastName: string;
    emailAddress:string;
    password:string;
  };

  isEditing?: boolean;
  isUpdating?: boolean;
}
