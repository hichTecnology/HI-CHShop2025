import { IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateCartDto {
  @IsString()
  userId: string; 
  
  @IsString()
  productId: string; 
  
  @IsNumber()
  quantity: number;
}
