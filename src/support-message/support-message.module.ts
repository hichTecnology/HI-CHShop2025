import { Module } from '@nestjs/common';
import { SupportMessageService } from './support-message.service';
import { SupportMessageController } from './support-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportMessage } from './entities/support-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportMessage]), // 👈 registra il repository
  ],
  controllers: [SupportMessageController],
  providers: [SupportMessageService],
  exports: [SupportMessageService,SupportMessageService],
})
export class SupportMessageModule {}
