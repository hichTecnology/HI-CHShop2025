import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '@/carts/entities/cart.entity';

@Injectable()
export class OrdersService {

  constructor( 
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>
   ) {}

  async create(createOrderDto: CreateOrderDto) {
    const carts = await Promise.all(createOrderDto.carts.map(x => this.prelaodCartsById(x)))
    const order = this.orderRepository.create({...createOrderDto,carts}); 
    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({relations:['shipment.address','payment','carts.product','user']});
  }

  findOne(id: string): Promise<Order>  {
    return this.orderRepository.findOne({where : {id},relations:['shipment.address','payment','carts.product','user']});
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const carts = await Promise.all(updateOrderDto.carts.map(x => this.prelaodCartsById(x)))
    const order =await this.findOne(id); 
    if(!order){
      throw new NotFoundException(`this user : ${id} is not found`)
    }
 
    await this.orderRepository.save({id:id , ...updateOrderDto,carts});
    return this.orderRepository.findOne({ where: { id } });
  }

  async getOrdersByPaginated(
      
      page: number,
      limit: number,
    ): Promise<{ orders: Order[]; total: number }> {
      const [orders, total] = await this.orderRepository.findAndCount({
        order: {
          createdAt: 'DESC', // Ordine crescente
        },
        relations:{
          user : true,
          shipment : {
            address : true
          },
          payment: true,
          carts: {
            product: true,
          }
          },
        skip: (page - 1) * limit, // Salta i risultati precedenti in base alla pagina
        take: limit, // Limita il numero di risultati
      });
  
      return {
        orders,
        total, // Numero totale di prodotti nel range
      };
    }

  async remove(id: string) {
    const order = await  this.findOne(id)
    return await this.orderRepository.remove(order)
  }

  private async prelaodCartsById(id :string) :Promise<Cart>{
      const cart = await this.cartRepository.findOne({where : {id}})
      if(cart){
        return cart
      }
      return this.cartRepository.create({id})
    }
}
