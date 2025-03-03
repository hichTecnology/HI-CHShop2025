import { IsNumber, IsString } from "class-validator";

export class CreateColorDto {

  @IsString()
  name : string;

  @IsString()
  cod : string

  @IsNumber()
  stock : number
}
