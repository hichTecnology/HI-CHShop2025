import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SizesService {
  constructor( 
    @InjectRepository(Size)
    private sizeRepository: Repository<Size> ) {}

  create(createSizeDto: CreateSizeDto) {
    const size = this.sizeRepository.create(createSizeDto); 
    return this.sizeRepository.save(size);
  }

  findAll() : Promise<Size[]> {
    return this.sizeRepository.find();
  }

  findOne(id: string): Promise<Size> {
    return this.sizeRepository.findOne({where : {id}});
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    const size =await this.findOne(id); 
    if(!size){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(size, updateSizeDto); 
    return this.sizeRepository.save(size);
  }

  async remove(id: string) {
    const size = await  this.findOne(id)
    return await this.sizeRepository.remove(size)
  }
}
