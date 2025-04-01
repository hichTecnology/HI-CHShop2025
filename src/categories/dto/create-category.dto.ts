import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  name: string; 

  @IsNumber()
  grado: number; 

  @IsOptional()
  @IsInt()
  parentId : number
  

  
}
