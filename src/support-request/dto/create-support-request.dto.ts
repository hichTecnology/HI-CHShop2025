import { IsString, IsNotEmpty, IsNumber, ValidateIf, IsUUID } from 'class-validator';

export class CreateSupportRequestDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  status: string;

  @ValidateIf(o => !o.userId)
  @IsUUID()
  userId?: string;
}
