import { IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
  @IsNumber()
  rating: number; 
  
  @IsString()
  comment: string; 
  
  @IsString()
  userId: string; 
  
  @IsString()
  productId: string;
}
