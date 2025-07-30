import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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

  @Get('request/:id')
  findOne(@Param('id') id: string) {
    return this.supportService.findOne(id);
  }
  // @Get('request/page/messages')
  @Get('/page/messages')
    async getProductsPage(
     
      @Query('page') page: string,
      @Query('limit') limit: string,
    ) {
      
      const currentPage = parseInt(page, 10) || 1; // Valore predefinito: pagina 1
      const pageSize = parseInt(limit, 10) || 10; // Valore predefinito: 10 risultati per pagina
  
      return this.supportService.getSupportByPaginated( currentPage, pageSize);
    }

  @Post('request')
  createRequest(@Body() dto: CreateSupportRequestDto) {
    return this.supportService.createRequest(dto);
  }

  @Get('/users/:userId/messages')
    async getUserMessages(@Param('userId') userId: string) {
    return this.supportService.getMessagesByUser(userId);
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
