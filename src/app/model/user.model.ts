export interface UserDto {
    id: number;
    
    firstName: string;
    lastName: string;
    emailAddress: string;

    isEditing?: boolean;
    isUpdating?: boolean;
}