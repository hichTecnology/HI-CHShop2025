import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';

@Controller('auth-user')
export class AuthUserController {

  constructor(private authUserService: AuthUserService) {}
    
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authUserService.signIn(signInDto.email, signInDto.password);
    }
}


