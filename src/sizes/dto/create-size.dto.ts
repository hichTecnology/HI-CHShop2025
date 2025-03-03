import { IsNumber, IsString } from "class-validator";

export class CreateSizeDto {

  @IsString()
  name : string;

  @IsNumber()
  stock : number
}
