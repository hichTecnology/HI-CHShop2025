import { IsNumber, IsOptional, IsString, Matches } from "class-validator";

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

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{7,15}$/, { message: 'Il numero di telefono non è valido' })
  telefono?: string; // 👈 campo facoltativo

  @IsString()
  civico: string;
  
  @IsString()
  provincia: string;

  @IsString()
  regione: string;
}
