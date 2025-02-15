import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor( 
    @InjectRepository(Order)
    private orderRepository: Repository<Order> ) {}

  create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto); 
    return this.orderRepository.save(createOrderDto);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: string): Promise<Order>  {
    return this.orderRepository.findOne({where : {id}});
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order =await this.findOne(id); 
    if(!order){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(order, updateOrderDto); 
    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    const order = await  this.findOne(id)
    return await this.orderRepository.remove(order)
  }
}
