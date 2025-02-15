import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateSaleDto {
  @IsString()
  productId: string; 
  
  @IsNumber()
  discountPercentage: number; 
  
  @IsDate()
  startDate: Date; 
  
  @IsDate()
  endDate: Date;
}
