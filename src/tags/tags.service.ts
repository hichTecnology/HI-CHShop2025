import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor( 
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag> ) {}
    
  create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto); 
    return this.tagRepository.save(tag);
  }

  findAll() : Promise<Tag[]> {
    return this.tagRepository.find();
  }
  async cercaName(name : string){
    return this.tagRepository.findOne({where : {name:name},
      relations:["products",
        "products.colors",
        "products.sizes",
        "products.varients",
      ]}) 
  }

  findOne(id: string) : Promise<Tag> {
    return this.tagRepository.findOne({where : {id}
    });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag =await this.findOne(id); 
    if(!tag){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(tag, updateTagDto); 
    return this.tagRepository.save(tag);
  }

  async remove(id: string) {
    const tag = await  this.findOne(id)
    return await this.tagRepository.remove(tag)
  }
}
