export interface ReviewCreate {
    overallRating: number;
    comment: string;
    reviewDate: Date;
    propertyId: number,
    userId: number
}