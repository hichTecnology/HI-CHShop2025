import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesService {
  constructor( 
    @InjectRepository(Address)
    private addressRepository: Repository<Address> ) {}

  create(createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create(createAddressDto); 
    return this.addressRepository.save(address);
  }

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  findOne(id: string): Promise<Address> {
    return this.addressRepository.findOne({where : {id}});
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address =await this.findOne(id); 
    if(!address){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(address, updateAddressDto); 
    return this.addressRepository.save(address);
  }

  async remove(id: string) {
    const order = await  this.findOne(id)
    return await this.addressRepository.remove(order)
  }
}
