import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor( 
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment> ) {}

  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto); 
    return this.paymentRepository.save(payment);
  }

  findAll() : Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  findOne(id: string): Promise<Payment>  {
    return this.paymentRepository.findOne({where : {id}});
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment =await this.findOne(id); 
    if(!payment){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(payment, updatePaymentDto); 
    return this.paymentRepository.save(payment);
  }

  async remove(id: string) {
    const payment = await  this.findOne(id)
    return await this.paymentRepository.remove(payment)
  }
}
