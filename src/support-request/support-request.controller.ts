import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { UpdateSupportRequestDto } from './dto/update-support-request.dto';
import { SupportRequest } from './entities/support-request.entity';
import { CreateSupportMessageDto } from '@/support-message/dto/create-support-message.dto';

@Controller('support')
export class SupportRequestController {
  constructor(private readonly supportService: SupportRequestService) {}

  @Get('requests')
  findAll() {
    return this.supportService.findAll();
  }

  @Get('messages')
  findAllMessage() {
    return this.supportService.findAllMessages();
  }

  @Post('request')
  createRequest(@Body() dto: CreateSupportRequestDto) {
    return this.supportService.createRequest(dto);
  }

  @Post('message')
  createMessage(@Body() dto: CreateSupportMessageDto) {
    return this.supportService.createMessage(dto);
  }

  

  @Get('request/:id/messages')
  getMessages(@Param('id') id: string) {
    return this.supportService.getMessages(id);
  }
}
