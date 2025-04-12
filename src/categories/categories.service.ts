import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Product } from '@/products/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor( 
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category> ,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto); 
    return this.categoriesRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({where: { parent: null },relations:["children.models","children.children.models","models"]});
  }
  findGrade( grado: number): Promise<Category[]> {
    return this.categoriesRepository.find({where: { grado: grado },
      relations:["children.models","children.children.models","models"]});
  }

  async findCate(name : string){
    return this.categoriesRepository.findOne({where : {name:name},
      relations:["products",
        "products.colors",
        "products.sizes",
        "products.varients",
        "products.tags",
        
      ]}) .then(category => {
        if (!category) return null;
        return category.products
      });
  }
  public async getProductsByCategoryAndTag(categoryName: string, tagName: string) {
    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category') // Relazione con la categoria
      .innerJoinAndSelect('product.tags', 'tag')    // Relazione con i tag
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.varients', 'varients')
      .where('category.name = :categoryName', { categoryName }) // Filtro per la categoria
      .andWhere('tag.name = :tagName', { tagName })       // Filtro per il nome del tag
      .getMany();                                         // Recupera i prodotti
  }

  public async getProductsFromCategoryWithDetails(categoryName: string, minPrice: number, maxPrice: number) {
    return await this.categoriesRepository.findOne({
      where: { name: categoryName },
      relations: ['products',
        "products.colors",
        "products.sizes",
        "products.varients",
        "products.tags",]
    }).then(category => {
      if (!category) return null;
      return category.products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    });
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
