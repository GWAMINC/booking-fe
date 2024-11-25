import { PropertyDto } from "./property.model";
import { UserDto } from "./user.model";

export interface ReviewDto {
    id: number;
    overallRating: number;
    comment: string;
    reviewDate: Date;

    property: PropertyDto,
    user: UserDto,

    isEditing?: boolean;
    isUpdating?: boolean;
}