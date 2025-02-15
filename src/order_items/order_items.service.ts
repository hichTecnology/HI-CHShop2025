import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { OrderItem } from './entities/order_item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor( 
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem> ) {}


  create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.orderItemRepository.create(createOrderItemDto); 
    return this.orderItemRepository.save(orderItem);
  }

  findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  findOne(id: string): Promise<OrderItem>{
    return this.orderItemRepository.findOne({where : {id}});
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem =await this.findOne(id); 
    if(!orderItem){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(orderItem, updateOrderItemDto); 
    return this.orderItemRepository.save(orderItem);
  }

  async remove(id: string) {
    const order_item = await  this.findOne(id)
    return await this.orderItemRepository.remove(order_item)
  }
}
