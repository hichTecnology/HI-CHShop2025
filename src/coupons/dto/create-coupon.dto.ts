import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateCouponDto {
  @IsString()
  code: string; 
  
  @IsNumber()
  discountAmount: number; 
  
  @IsDate()
  startDate: Date; 
  
  @IsDate()
  endDate: Date; 
  
  @IsNumber()
  usageLimit: number;
}
