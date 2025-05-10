import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor( 
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart> ) {}

  create(createCartDto: CreateCartDto) {
    const cart = this.cartRepository.create(createCartDto); 
    return this.cartRepository.save(cart);
  }

  findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  findOne(id: string): Promise<Cart> {
    return this.cartRepository.findOne({where : {id}});
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart =await this.findOne(id); 
    if(!cart){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(cart, updateCartDto); 
    return this.cartRepository.save(cart);
  }

  async remove(id: string) {
    const cart = await  this.findOne(id)
    return await this.cartRepository.remove(cart)
  }

  async clearUserCart(userId: string) {
    await this.cartRepository.update({ user: { id: userId } },{ user: null },);
    return { message: 'Carrello scollegato' };
  }
}
