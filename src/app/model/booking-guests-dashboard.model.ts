export interface BookingGuest {
  id: number | null;
  bookingId: number | null;
  guestTypeId: number | null;
  numGuests: number;
  isEditing?: boolean;
}
