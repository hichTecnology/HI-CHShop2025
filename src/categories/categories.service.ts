import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor( 
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category> ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto); 
    return this.categoriesRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({relations:{children:true}});
  }

  findOne(id: string): Promise<Category> {
    return this.categoriesRepository.findOne({where : {id}});
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category =await this.findOne(id); 
    if(!category){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(category, updateCategoryDto); 
    return this.categoriesRepository.save(category);
  }

  async remove(id: string) {
    const order = await  this.findOne(id)
    return await this.categoriesRepository.remove(order)
  }
}
