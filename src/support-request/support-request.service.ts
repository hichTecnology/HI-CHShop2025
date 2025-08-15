import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupportRequest } from "./entities/support-request.entity";
import { Repository } from "typeorm";
import { SupportMessage } from "@/support-message/entities/support-message.entity";
import { CreateSupportRequestDto } from "./dto/create-support-request.dto";
import { CreateSupportMessageDto } from "@/support-message/dto/create-support-message.dto";
import { SupportGateway } from "./support.gateway";

@Injectable()
export class SupportRequestService {
  constructor(
    @InjectRepository(SupportRequest)
    private requestRepo: Repository<SupportRequest>,
    private readonly gateway: SupportGateway,

    @InjectRepository(SupportMessage)
    private messageRepo: Repository<SupportMessage>,
  ) {}

  async createRequest(dto: CreateSupportRequestDto) {
    const request = this.requestRepo.create({
      message: dto.message,
      subject: dto.subject,
      status: dto.status || 'open', // default to 'open'
      user: dto.userId ? { id: dto.userId } : undefined,
    });
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

  const savedMessage = await this.messageRepo.save(message);
  const fullMessage = await this.messageRepo.findOne({
    where: { id: savedMessage.id },
    relations: ['supportRequest', 'userSender', 'adminSender'],
  });
    this.gateway.sendNewMessage(fullMessage);
  return fullMessage;
}
 

async getMessagesByUser(userId: string): Promise<SupportMessage[]> {
  return this.messageRepo.find({
    where: {
      userSender: { id: userId },
    },
    order: {
      createdAt: 'ASC', // oppure 'DESC' se vuoi ordine inverso
    },
    relations: ['supportRequest'], // se ti servono join
  });
}
 async getSupportByPaginated(
      
      page: number,
      limit: number,
    ): Promise<{ supportRequests: SupportRequest[]; total: number }> {
      const [supportRequests, total] = await this.requestRepo.findAndCount({
        order: {
          createdAt: 'DESC', // Ordine crescente
        },
        relations:{
          user: true,
          messages: {
            userSender: true,
            adminSender: true,
          },
         
          
          },
        skip: (page - 1) * limit, // Salta i risultati precedenti in base alla pagina
        take: limit, // Limita il numero di risultati
      });
  
      return {
        supportRequests: supportRequests,
        total, // Numero totale di prodotti nel range
      };
    }


  async getMessages(supportRequestId: string) {
    return this.messageRepo.find({
      where: { supportRequest: { id: supportRequestId } },
      relations: ['userSender', 'adminSender'],
      order: { createdAt: 'ASC' },
    });
  }
  
  async remove(id: string) {
    const message = await this.findOne(id);
    return await this.requestRepo.remove(message);
  }
}

