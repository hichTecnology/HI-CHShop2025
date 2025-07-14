import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupportMessageService } from './support-message.service';
import { CreateSupportMessageDto } from './dto/create-support-message.dto';
import { UpdateSupportMessageDto } from './dto/update-support-message.dto';

@Controller('support-message')
export class SupportMessageController {
  constructor(private readonly supportMessageService: SupportMessageService) {}

  @Post()
  create(@Body() createSupportMessageDto: CreateSupportMessageDto) {
    return this.supportMessageService.create(createSupportMessageDto);
  }

  @Get()
  findAll() {
    return this.supportMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupportMessageDto: UpdateSupportMessageDto) {
    return this.supportMessageService.update(+id, updateSupportMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportMessageService.remove(+id);
  }
}
