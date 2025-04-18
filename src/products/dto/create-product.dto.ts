import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;
  
  @IsString()
  image: string;
  
  @IsString()
  description: string; 
  
  @IsNumber()
  price: number; 
  
  @IsNumber()
  stock: number; 
  
  @IsString()
  adminId: string; 

  @IsString()
  saleId: string;

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
  readonly  medias: string[]
}
