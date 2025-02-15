import { IsNumber, IsString } from "class-validator";
import { CreateOrderItemDto } from "src/order_items/dto/create-order_item.dto";

export class CreateOrderDto {
  @IsString()
  userId: string; 

  @IsNumber()
  totalAmount: number; 

  @IsString()
  status: string; 

  
  items: CreateOrderItemDto[];
}
