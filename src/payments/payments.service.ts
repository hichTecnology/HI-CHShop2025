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
    private readonly clientId = "Af9VuW4mgVT6eq0BEL8uBpERIaVeJuw4v2OgBbh77QnkihN5Af8pAjCsiIFwRQeGdd1Z18C8Zc-lxUk5";
    private readonly clientSecret = "EARqsxduOMsA28hOAVCS6QgCtwtELvVmKmN6lG1FO8GGDtaAVBk36c1VPDRrASbaI6Fd5RH3-Vu863gR";

  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto); 
    return this.paymentRepository.save(payment);
  }

  findAll() : Promise<Payment[]> {
    return this.paymentRepository.find({relations : {order : true}});
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
    try {
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
    } catch (error) {
      if (error.isAxiosError && error.response) {
        console.error('PayPal Access Token Errore Stato:', error.response.status);
        console.error('PayPal Access Token Dati Errore:', error.response.data); // Questo è fondamentale!
        console.error('PayPal Access Token Header Errore:', error.response.headers);
      } else {
        console.error('Errore inatteso nel recupero del token PayPal:', error.message);
      }
      throw error; // Rilancia l'errore per propagarlo
    }
    
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
