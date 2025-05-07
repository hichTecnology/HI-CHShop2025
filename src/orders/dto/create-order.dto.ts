import { IsNumber, IsString } from "class-validator";
import { CreateOrderItemDto } from "src/order_items/dto/create-order_item.dto";

export class CreateOrderDto {
  @IsString()
  userId: string; 


  @IsString({each :true})
  readonly carts  : string[]


  @IsNumber()
  totalAmount: number; 

  @IsString()
  status: string; 

}
