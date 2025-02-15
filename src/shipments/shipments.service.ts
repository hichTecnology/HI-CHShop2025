import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './entities/shipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShipmentsService {
  constructor( 
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment> ) {}

  create(createShipmentDto: CreateShipmentDto) {
    const admin = this.shipmentRepository.create(createShipmentDto); 
    return this.shipmentRepository.save(admin);
  }

  findAll() : Promise< Shipment[]> {
    return this.shipmentRepository.find();
  }

  findOne(id: string) : Promise< Shipment> {
    return this.shipmentRepository.findOne({where : {id}});
  }

  async update(id: string, updateShipmentDto: UpdateShipmentDto) {
    const shipmet =await this.findOne(id); 
    if(!shipmet){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(shipmet,updateShipmentDto); 
    return this.shipmentRepository.save(shipmet);
  }

  async remove(id: string) {
    const shipment = await  this.findOne(id)
    return await this.shipmentRepository.remove(shipment)
  }
}
