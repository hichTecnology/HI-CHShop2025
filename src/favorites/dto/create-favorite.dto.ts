import { IsString } from "class-validator";

export class CreateFavoriteDto {
  @IsString()
  productId: string

  @IsString()
  userId: string

}