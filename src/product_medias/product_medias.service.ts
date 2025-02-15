import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductMediaDto } from './dto/create-product_media.dto';
import { UpdateProductMediaDto } from './dto/update-product_media.dto';
import { ProductMedia } from './entities/product_media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductMediasService {
  constructor( 
    @InjectRepository(ProductMedia)
    private proMediaRepository: Repository<ProductMedia> ) {}

  create(createProductMediaDto: CreateProductMediaDto) {
    const proMedia = this.proMediaRepository.create(createProductMediaDto); 
    return this.proMediaRepository.save(proMedia);
  }

  findAll() : Promise<ProductMedia []>{
    return this.proMediaRepository.find({relations :{product:true}});
  }

  findOne(id: string) : Promise<ProductMedia >{
    return this.proMediaRepository.findOne({where : {id}});
  }

  async update(id: string, updateProductMediaDto: UpdateProductMediaDto) {
    const proMedia =await this.findOne(id); 
    if(!proMedia){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(proMedia, updateProductMediaDto); 
    return this.proMediaRepository.save(proMedia);
  }

  async remove(id: string) {
    const proMedia = await  this.findOne(id)
    return await this.proMediaRepository.remove(proMedia)
  }
}
