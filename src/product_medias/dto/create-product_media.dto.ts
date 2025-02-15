import { IsString } from "class-validator";

export class CreateProductMediaDto {
  @IsString()
  productId: string; 
  
  @IsString()
  mediaType: string; 
  
  @IsString()
  url: string;
}
