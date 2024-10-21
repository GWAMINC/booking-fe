import { RegionDto } from "./region.model";

export interface CountryDto {
  id: number;
  name: string;
  region: RegionDto;
  isEditing?: boolean;
  isUpdating?: boolean;
}
