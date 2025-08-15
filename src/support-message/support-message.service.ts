import { Injectable } from '@nestjs/common';
import { CreateSupportMessageDto } from './dto/create-support-message.dto';
import { UpdateSupportMessageDto } from './dto/update-support-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportMessage } from './entities/support-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupportMessageService {
  constructor( 
      @InjectRepository(SupportMessage)
      private messageRepository: Repository<SupportMessage>, ) {}
      
  create(createSupportMessageDto: CreateSupportMessageDto) {
    return 'This action adds a new supportMessage';
  }

  findAll() {
    return `This action returns all supportMessage`;
  }

  findOne(id: string) {
    return this.messageRepository.findOne({where : {id}});
  }

  update(id: number, updateSupportMessageDto: UpdateSupportMessageDto) {
    return `This action updates a #${id} supportMessage`;
  }

   async remove(id: string) {
    const message = await this.findOne(id);
    return await this.messageRepository.remove(message);
  }
}
