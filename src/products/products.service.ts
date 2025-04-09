import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from '@/colors/entities/color.entity';
import { Size } from '@/sizes/entities/size.entity';
import { Variente } from '@/varientes/entities/variente.entity';
import { Tag } from '@/tags/entities/tag.entity';
import { ProductMedia } from '@/product_medias/entities/product_media.entity';
import { Category } from '@/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor( 
    @InjectRepository(Product)
    private productRepository: Repository<Product> ,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
    @InjectRepository(Variente)
    private varienteRepository: Repository<Variente>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(ProductMedia)
    private MediaRepository: Repository<ProductMedia>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    
  ) {}

  async create(createProductDto: CreateProductDto) {
    const colors = await Promise.all(createProductDto.colors.map(x => this.prelaodColorsById(x)))
    const sizes = await Promise.all(createProductDto.sizes.map(x => this.prelaodSizesById(x)))
    const varients = await Promise.all(createProductDto.varients.map(x => this.prelaodVarientsById(x)))
    const tags = await Promise.all(createProductDto.tags.map(x => this.prelaodTagsById(x)))
    const medias = await Promise.all(createProductDto.medias.map(x => this.prelaodMediasById(x)))
    const category = await Promise.all(createProductDto.category.map(x => this.prelaodCategoryById(x)))
    const product = this.productRepository.create({...createProductDto,colors,sizes,varients,tags,medias,category}); 
    return this.productRepository.save(product);
  }

  findAll() : Promise< Product []> {
    return  this.productRepository.find({relations :{admin :true,
      category : true,
      colors : true,
      varients : true,
      sale : true,
      tags : true,
      sizes : true,
      medias : true,
      model : true
    }});
    
  }

  findOne(id: string): Promise< Product > {
    return this.productRepository.findOne({where : {id},relations:{
      admin :true,
      category : true,
      colors : true,
      sizes : true,
      varients : true,
      sale : true,
      tags : true,
      medias : true}});
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const colors = await Promise.all(updateProductDto.colors.map(x => this.prelaodColorsById(x)))
    const sizes = await Promise.all(updateProductDto.sizes.map(x => this.prelaodSizesById(x)))
    const varients = await Promise.all(updateProductDto.varients.map(x => this.prelaodVarientsById(x)))
    const tags = await Promise.all(updateProductDto.tags.map(x => this.prelaodTagsById(x)))
    const medias = await Promise.all(updateProductDto.medias.map(x => this.prelaodMediasById(x)))
    const category = await Promise.all(updateProductDto.category.map(x => this.prelaodCategoryById(x)))
    const product =await this.findOne(id); 
    if(!product){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    await this.productRepository.save({id:id,...updateProductDto,colors,sizes,
      varients,tags,medias,category})
    
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const product = await  this.productRepository.findOne({where:{id},relations:{medias:true}})
    if (product.medias && product.medias.length > 0) {
      await this.MediaRepository.remove(product.medias);
    }
    return await this.productRepository.remove(product)
  }
  private async prelaodColorsById(id :string) :Promise<Color>{
    const colors = await this.colorRepository.findOne({where : {id}})
    if(colors){
      return colors
    }
    return this.colorRepository.create({id})
  }

  private async prelaodSizesById(id :string) :Promise<Size>{
    const sizes = await this.sizeRepository.findOne({where : {id}})
    if(sizes){
      return sizes
    }
    return this.sizeRepository.create({id})
  }

  private async prelaodVarientsById(id :string) :Promise<Variente>{
    const variente = await this.varienteRepository.findOne({where : {id}})
    if(variente){
      return variente
    }
    return this.varienteRepository.create({id})
  }

  private async prelaodTagsById(id :string) :Promise<Tag>{
    const tag = await this.tagRepository.findOne({where : {id}})
    if(tag){
      return tag
    }
    return this.tagRepository.create({id})
  }

  private async prelaodMediasById(id :string) :Promise<ProductMedia>{
    const media = await this.MediaRepository.findOne({where : {id}})
    if(media){
      return media
    }
    return this.MediaRepository.create({id})
  }

  private async prelaodCategoryById(id :string) :Promise<Category>{
    const category = await this.categoryRepository.findOne({where : {id}})
    if(category){
      return category
    }
    return this.categoryRepository.create({id})
  }
}
