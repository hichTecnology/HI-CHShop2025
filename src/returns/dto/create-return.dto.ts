import { IsNumber, IsString } from "class-validator";

export class CreateReturnDto {
  @IsString()
  orderId: string; 

  @IsString()
  productId: string; 

  @IsNumber()
  quantity: number; 

  @IsString()
  reason: string; 

  @IsString()
  status: string;
}
