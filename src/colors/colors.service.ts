import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {

  constructor( 
    @InjectRepository(Color)
    private colorRepository: Repository<Color>, ) {}
  
  create(createColorDto: CreateColorDto) {
    const color = this.colorRepository.create(createColorDto); 
    return this.colorRepository.save(color);
  }

  findAll(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  findOne(id: string): Promise<Color> {
    return this.colorRepository.findOne({where : {id}});
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    const color = await this.findOne(id); 
    if(!color){
      throw new NotFoundException(`this color : ${id} is not found`)
    }
    await this.colorRepository.save({id:id,...updateColorDto})
    
  }

  async remove(id: string) {
    const color = await  this.findOne(id)
    return await this.colorRepository.remove(color)
  }
}
