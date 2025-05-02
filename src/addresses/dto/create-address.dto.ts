import { IsNumber, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  userId: string; 
  
  @IsString()
  indirizzo1: string; 
  
  @IsString()
  indirizzo2?: string; 
  
  @IsString()
  comune: string; 
  
  @IsString()
  stato: string; 
  
  @IsNumber()
  CAP: number; 

  @IsNumber()
  telefono: number;

  @IsString()
  civico: string;
  
  @IsString()
  provincia: string;

  @IsString()
  regione: string;
}
