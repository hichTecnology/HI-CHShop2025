import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AdminsService } from '@/admins/admins.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
    
  ) {}
  

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string,id : string }> {
    const user = await this.adminsService.findOneAuth(email);
    
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
