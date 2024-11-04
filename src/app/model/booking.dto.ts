export interface BookingDto {
  id: number; 
  propertyId: number; 
  userId: number; 
  bookingStatusId: number; 
  checkinDate: Date | string; 
  checkoutDate: Date | string;  
  nightlyPrice: number; 
  serviceFee: number; 
  cleaningFee: number; 
  totalPrice: number; 
}
