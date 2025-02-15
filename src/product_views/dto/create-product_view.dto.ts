import { IsString } from "class-validator";

export class CreateProductViewDto {
  @IsString()
  userId: string; 
  
  @IsString()
  productId: string
}
