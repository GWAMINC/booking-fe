import {CountryDto} from "./country.model";

export interface LocationDTO {
  id: number;
  name: string;
  country: CountryDto;
  isEditing?: boolean;
  isUpdating?: boolean;
}
