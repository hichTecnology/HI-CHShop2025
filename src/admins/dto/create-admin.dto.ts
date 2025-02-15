import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {

  @IsString() 
  username: string; 
  
  @IsEmail() 
  email: string; 
  
  @IsStrongPassword() 
  password: string;
}
