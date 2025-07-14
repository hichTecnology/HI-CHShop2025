import { IsString, IsNotEmpty, IsNumber, IsIn, ValidateIf, IsUUID } from 'class-validator';

export class CreateSupportMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  supportRequestId: string;

  @ValidateIf(o => !o.adminId)
  @IsUUID()
  userId?: string;

  @ValidateIf(o => !o.userId)
  @IsUUID()
  adminId?: string;
}
