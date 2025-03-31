import { IsNumber, IsString } from "class-validator";

export class CreateColorDto {
   
  @IsString()
  name : string;

  @IsString()
  cod : string

  @IsNumber()
  price : number

  @IsNumber()
  stock : number
}
