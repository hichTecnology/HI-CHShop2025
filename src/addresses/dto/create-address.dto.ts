import { IsNumber, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  userId: string; 
  
  @IsString()
  addressLine1: string; 
  
  @IsString()
  addressLine2?: string; 
  
  @IsString()
  city: string; 
  
  @IsString()
  state: string; 
  
  @IsNumber()
  postalCode: number; 
  
  @IsString()
  country: string;
}
