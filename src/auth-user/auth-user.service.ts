import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUserService {

  constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      
    ) {}
  async signIn(
      email: string,
      password: string,
    ): Promise<{ access_token: string,id : string }> {
      const user = await this.usersService.findOneAuth(email);
      
      if (user?.email !== email || user?.password !== password) {
        throw new UnauthorizedException();
      }
      const payload = { id : user.id, email: user.email, password: user.password };
      return {
        access_token: await this.jwtService.signAsync(payload),
        id : payload.id
      };
    }
    
}
