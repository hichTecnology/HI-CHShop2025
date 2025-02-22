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
    private MediaRepository: Repository<ProductMedia>
    
  ) {}

  async create(createProductDto: CreateProductDto) {
    const colors = await Promise.all(createProductDto.colors.map(x => this.prelaodColorsById(x)))
    const sizes = await Promise.all(createProductDto.sizes.map(x => this.prelaodSizesById(x)))
    const varients = await Promise.all(createProductDto.varients.map(x => this.prelaodVarientsById(x)))
    const tags = await Promise.all(createProductDto.tags.map(x => this.prelaodTagsById(x)))
    const medias = await Promise.all(createProductDto.medias.map(x => this.prelaodMediasById(x)))
    const product = this.productRepository.create({...createProductDto,colors,sizes,varients,tags,medias}); 
    return this.productRepository.save(product);
  }

  findAll() : Promise< Product []> {
    return  this.productRepository.find({relations :{admin :true,
      category : true,
      colors : true,
      varients : true,
      sale : true,
      tags : true,
      medias : true
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
    const product =await this.findOne(id); 
    if(!product){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(product, updateProductDto); 
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await  this.findOne(id)
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
}
