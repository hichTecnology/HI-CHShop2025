import { IsBoolean, IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {

  @IsString() 
  username: string; 
  
  @IsEmail() 
  email: string; 
  
  @IsBoolean()
  check : boolean
  
  @IsStrongPassword() 
  password: string;
}
