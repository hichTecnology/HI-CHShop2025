import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelService {
  constructor( 
      @InjectRepository(Model)
      private ModelsRepository: Repository<Model> ) {}

  create(createModelDto: CreateModelDto) {
    const model = this.ModelsRepository.create(createModelDto); 
    return this.ModelsRepository.save(model);
  }

  findAll() {
    return this.ModelsRepository.find({relations:{category:true}});
  }

  findOne(id: string) {
    return this.ModelsRepository.findOne({where : {id}});
  }

  async update(id: string, updateModelDto: UpdateModelDto) {
    const model =await this.findOne(id); 
        if(!model){
          throw new NotFoundException(`this user : ${id} is not found`)
        }
    
        Object.assign(model, updateModelDto); 
        return this.ModelsRepository.save(model);
  }

  async remove(id: string) {
    const model = await  this.findOne(id)
    return await this.ModelsRepository.remove(model)
  }
}
