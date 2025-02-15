import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CouponsService {
  constructor( 
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon> ) {}

  create(createCouponDto: CreateCouponDto) {
    const admin = this.couponRepository.create(createCouponDto); 
    return this.couponRepository.save(admin);
  }

  findAll(): Promise<Coupon[]> {
    return this.couponRepository.find();
  }

  findOne(id: string): Promise<Coupon>  {
    return this.couponRepository.findOne({where : {id}});
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    const coupon =await this.findOne(id); 
    if(!coupon){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(coupon, updateCouponDto); 
    return this.couponRepository.save(coupon);
  }

  async remove(id: string) {
    const coupon = await  this.findOne(id)
    return await this.couponRepository.remove(coupon)
  }
}
