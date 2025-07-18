import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupportRequest } from "./entities/support-request.entity";
import { Repository } from "typeorm";
import { SupportMessage } from "@/support-message/entities/support-message.entity";
import { CreateSupportRequestDto } from "./dto/create-support-request.dto";
import { CreateSupportMessageDto } from "@/support-message/dto/create-support-message.dto";

@Injectable()
export class SupportRequestService {
  constructor(
    @InjectRepository(SupportRequest)
    private requestRepo: Repository<SupportRequest>,

    @InjectRepository(SupportMessage)
    private messageRepo: Repository<SupportMessage>,
  ) {}

  async createRequest(dto: CreateSupportRequestDto) {
    const request = this.requestRepo.create(dto);
    return await this.requestRepo.save(request);
  }

  findAll() : Promise< SupportRequest[]> {
      return this.requestRepo.find({relations: {messages: {userSender: true, adminSender: true},user: true}});
  }

  findAllMessages() : Promise< SupportMessage[]> {
    return this.messageRepo.find({relations: {supportRequest : true ,}});
  }

  findOne(id: string): Promise< SupportRequest>  {
    return this.requestRepo.findOne({where : {id},relations:{messages : {userSender:true , adminSender: true}}});
  }

async createMessage(dto: CreateSupportMessageDto) {
  const supportRequest = await this.requestRepo.findOneBy({
    id: dto.supportRequestId,
  });

  if (!supportRequest) {
    throw new NotFoundException('Support Request not found');
  }

  const message = this.messageRepo.create({
    content: dto.content,
    supportRequest: supportRequest,
    adminSender: dto.adminId ? { id: dto.adminId } : undefined,
    userSender: dto.userId ? { id: dto.userId } : undefined,
  });
  return await this.messageRepo.save(message);
}
  

  


  async getMessages(supportRequestId: string) {
    return this.messageRepo.find({
      where: { supportRequest: { id: supportRequestId } },
      relations: ['userSender', 'adminSender'],
      order: { createdAt: 'ASC' },
    });
  }
}

