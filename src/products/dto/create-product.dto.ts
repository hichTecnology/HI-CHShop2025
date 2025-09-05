import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Grade } from "../entities/product.entity";

export class CreateProductDto {
  @IsString()
  name: string;
  
  @IsString()
  image: string;
  
  @IsString()
  description: string; 

  @IsString()
  numberSerial: string; 

  @IsNumber()
  battery: number; 
  
  @IsNumber()
  price: number; 
  
  @IsNumber()
  stock: number; 
  
  @IsString()
  adminId: string; 

  @IsString()
  saleId: string;

  @IsEnum(Grade)
  grade: Grade;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  prodottiCorrelatiIds?: string[];

  @IsString({each :true})
  readonly colors  : string[]

  @IsString({each :true})
  readonly category  : string[]

  @IsString({each :true})
  readonly sizes  : string[]

  @IsString({each :true})
  readonly varients  : string[]

  @IsString({each :true})
  readonly tags  : string[]

  @IsString({each :true})
  readonly models  : string[]


  @IsString({each :true})
  readonly  medias: string[]
}
