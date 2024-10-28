export interface ReviewDto {
    id: number;
    overallRating: number;
    comment: string;
    reviewDate: Date;

    propertyId: number,
    userId: number,

    isEditing?: boolean;
    isUpdating?: boolean;
}