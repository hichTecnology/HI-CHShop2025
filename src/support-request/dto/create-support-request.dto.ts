import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSupportRequestDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  status: string;

  @IsNumber()
  userId: number;
}
