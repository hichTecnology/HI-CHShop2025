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
    private readonly paypalApiUrl = 'https://api-m.paypal.com';
    private readonly clientId = process.env.PAYPAL_CLIENT_ID
    private readonly clientSecret = process.env.PAYPAL_CLIENT_SECRET

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
    try {
      // Logga l'URL che stai per usare
      console.log('Sending PayPal create payment request to URL:', `${this.paypalApiUrl}/v2/checkout/orders`); // O la tua URL corretta
      // Logga il corpo della richiesta
      console.log('PayPal create payment request body:'); // Assicurati di passare il payload corretto
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
        
        verified: true,
      },
    };
  } catch (error) {
    if (error.isAxiosError && error.response) {
        console.error('PayPal Create Payment Errore Stato:', error.response.status);
        console.error('PayPal Create Payment Errore Dati:', error.response.data);
        console.error('PayPal Create Payment Errore Headers:', error.response.headers);
    } else {
        console.error('Errore inatteso nella creazione del pagamento PayPal:', error.message);
    }
    throw error; // Rilancia l'errore
  }}

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
