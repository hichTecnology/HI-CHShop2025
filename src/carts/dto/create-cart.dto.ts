import { IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateCartDto {
  @IsString()
  userId: string; 
  
  @IsString()
  productId: string; 

  @IsString()
  size: string;

  @IsString()
  color: string;
  
  @IsString()
  variente: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  totale: number;
}
