import { IsBoolean, IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsString()
  username: string; 
  
  @IsEmail()
  email: string; 

  @IsBoolean()
  verifiedEmail: boolean;
  
  @IsStrongPassword()
  password: string;
}
