import { Module } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { SupportRequestController } from './support-request.controller';
import { SupportMessageController } from '@/support-message/support-message.controller';
import { SupportMessageService } from '@/support-message/support-message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportRequest } from './entities/support-request.entity';
import { SupportMessage } from '@/support-message/entities/support-message.entity';
import { User } from '@/users/entities/user.entity';
import { Admin } from '@/admins/entities/admin.entity';
import { SupportGateway } from './support.gateway';


@Module({
  imports: [TypeOrmModule.forFeature([SupportRequest, SupportMessage,User, Admin])],
  controllers: [SupportRequestController,SupportMessageController],
  providers: [SupportRequestService,SupportMessageService,SupportGateway],
  exports: [SupportRequestService,SupportGateway],
})
export class SupportRequestModule {}
