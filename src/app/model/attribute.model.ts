import {AttributeCategoryDto} from "./attribute-category.model";

export interface AttributeDto {
  id : number;
  name : string;
  description : string;
  attributeCategory : AttributeCategoryDto;
  isEditing? : boolean;
  isUpdating? : boolean;
}
