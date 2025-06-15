import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor( 
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment> ) {}
    private readonly paypalApiUrl = 'https://api-m.sandbox.paypal.com';
    private readonly clientId = process.env.PAYPAL_CLIENT_ID!;
    private readonly clientSecret = process.env.PAYPAL_CLIENT_SECRET!;

  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto); 
    return this.paymentRepository.save(payment);
  }

  findAll() : Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  findOne(id: string): Promise<Payment>  {
    return this.paymentRepository.findOne({where : {id},relations : {order : true}});
  }

  async createPaymentPaypal(dto: CreatePaymentDto) {
    const token = await this.getPayPalAccessToken();

    const { data } = await axios.get(
      `${this.paypalApiUrl}/v2/checkout/orders/${dto.orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (data.status !== 'COMPLETED') {
      throw new Error('Ordine non completato');
    }

    const paidAmount = parseFloat(data.purchase_units[0].amount.value);
    if (paidAmount !== dto.amount) {
      throw new Error('Importo non corrispondente');
    }

    return {
      message: 'Pagamento verificato e salvato',
      savedData: {
        ...dto,
        verified: true,
      },
    };
  }

  private async getPayPalAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    const { data } = await axios.post(
      `${this.paypalApiUrl}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return data.access_token;
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
