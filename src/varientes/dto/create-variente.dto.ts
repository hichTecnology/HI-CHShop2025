import { IsNumber, IsString } from "class-validator";

export class CreateVarienteDto {
  @IsString()
  productId: string; 
  
  @IsString()
  name: string; 

  @IsString()
  image: string; 
  
  @IsNumber()
  price: number; 

  @IsNumber()
  stock: number;
}
