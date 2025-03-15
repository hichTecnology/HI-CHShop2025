import { forwardRef, Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/auth/constant';

@Module({

  imports :[
      forwardRef(() => UsersModule),
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      }),
    ],
    controllers: [AuthUserController],
    providers: [AuthUserService],
    exports : [AuthUserService]

})
export class AuthUserModule {}
