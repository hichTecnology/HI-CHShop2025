import { Module } from '@nestjs/common';
import { SupportMessageService } from './support-message.service';
import { SupportMessageController } from './support-message.controller';

@Module({
  controllers: [SupportMessageController],
  providers: [SupportMessageService],
  exports: [SupportMessageService],
})
export class SupportMessageModule {}
