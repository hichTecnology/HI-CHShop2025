import { Injectable } from '@nestjs/common';
import { CreateSupportMessageDto } from './dto/create-support-message.dto';
import { UpdateSupportMessageDto } from './dto/update-support-message.dto';

@Injectable()
export class SupportMessageService {
  create(createSupportMessageDto: CreateSupportMessageDto) {
    return 'This action adds a new supportMessage';
  }

  findAll() {
    return `This action returns all supportMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supportMessage`;
  }

  update(id: number, updateSupportMessageDto: UpdateSupportMessageDto) {
    return `This action updates a #${id} supportMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} supportMessage`;
  }
}
