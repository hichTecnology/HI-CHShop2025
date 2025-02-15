import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { Return } from './entities/return.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReturnsService {
  constructor( 
    @InjectRepository(Return)
    private returnRepository: Repository<Return> ) {}

  create(createReturnDto: CreateReturnDto) {
    const returnPro = this.returnRepository.create(createReturnDto); 
    return this.returnRepository.save(returnPro);
  }

  findAll() : Promise< Return[]> {
    return this.returnRepository.find();
  }

  findOne(id: string): Promise< Return>  {
    return this.returnRepository.findOne({where : {id}});
  }

  async update(id: string, updateReturnDto: UpdateReturnDto) {
    const returnPro =await this.findOne(id); 
    if(!returnPro){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(returnPro, updateReturnDto); 
    return this.returnRepository.save(returnPro);
  }

  async remove(id: string) {
    const returnPro = await  this.findOne(id)
    return await this.returnRepository.remove(returnPro)
  }
}
