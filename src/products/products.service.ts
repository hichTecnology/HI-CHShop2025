import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Color } from '@/colors/entities/color.entity';
import { Size } from '@/sizes/entities/size.entity';
import { Variente } from '@/varientes/entities/variente.entity';
import { Tag } from '@/tags/entities/tag.entity';
import { ProductMedia } from '@/product_medias/entities/product_media.entity';
import { Category } from '@/categories/entities/category.entity';
import { Model } from '@/model/entities/model.entity';

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
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
    
  ) {}

  async create(createProductDto: CreateProductDto) {
    const colors = await Promise.all(createProductDto.colors.map(x => this.prelaodColorsById(x)))
    const sizes = await Promise.all(createProductDto.sizes.map(x => this.prelaodSizesById(x)))
    const varients = await Promise.all(createProductDto.varients.map(x => this.prelaodVarientsById(x)))
    const tags = await Promise.all(createProductDto.tags.map(x => this.prelaodTagsById(x)))
    const medias = await Promise.all(createProductDto.medias.map(x => this.prelaodMediasById(x)))
    const category = await Promise.all(createProductDto.category.map(x => this.prelaodCategoryById(x)))
    const models = await Promise.all(createProductDto.models.map(x => this.prelaodModelsById(x)))
    const product = this.productRepository.create({...createProductDto,colors,sizes,varients,tags,medias,models,category}); 
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
      models : true
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
      models : true,
      medias : true}
    });
  }

  async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        price: Between(minPrice, maxPrice), // Range di prezzo
      },
      relations:{
        admin :true,
        category : true,
        colors : true,
        sizes : true,
        varients : true,
        sale : true,
        tags : true,
        medias : true}
    });
  }

  async getProductsByPriceRangePaginated(
    minPrice: number,
    maxPrice: number,
    page: number,
    limit: number,
  ): Promise<{ products: Product[]; total: number }> {
    const [products, total] = await this.productRepository.findAndCount({
      where: {
        price: Between(minPrice, maxPrice),
      },
      relations:{
        admin :true,
        category : true,
        colors : true,
        sizes : true,
        varients : true,
        sale : true,
        tags : true,
        medias : true},
      skip: (page - 1) * limit, // Salta i risultati precedenti in base alla pagina
      take: limit, // Limita il numero di risultati
    });

    return {
      products,
      total, // Numero totale di prodotti nel range
    };
  }

  async getProductsByPaginated(
    
    page: number,
    limit: number,
  ): Promise<{ products: Product[]; total: number }> {
    const [products, total] = await this.productRepository.findAndCount({
      
      relations:{
        admin :true,
        category : true,
        colors : true,
        sizes : true,
        varients : true,
        sale : true,
        tags : true,
        medias : true},
      skip: (page - 1) * limit, // Salta i risultati precedenti in base alla pagina
      take: limit, // Limita il numero di risultati
    });

    return {
      products,
      total, // Numero totale di prodotti nel range
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const colors = await Promise.all(updateProductDto.colors.map(x => this.prelaodColorsById(x)))
    const sizes = await Promise.all(updateProductDto.sizes.map(x => this.prelaodSizesById(x)))
    const varients = await Promise.all(updateProductDto.varients.map(x => this.prelaodVarientsById(x)))
    const tags = await Promise.all(updateProductDto.tags.map(x => this.prelaodTagsById(x)))
    const medias = await Promise.all(updateProductDto.medias.map(x => this.prelaodMediasById(x)))
    
    const models = await Promise.all(updateProductDto.models.map(x => this.prelaodModelsById(x)))
    const product =await this.findOne(id); 
    if(!product){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    await this.productRepository.save({id:id,...updateProductDto,colors,sizes,
      varients,tags,medias,models})
    
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

  private async prelaodModelsById(id :string) :Promise<Model>{
    const models = await this.modelRepository.findOne({where : {id}})
    if(models){
      return models
    }
    return this.modelRepository.create({id})
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

  async getProdottoConSuggeriti(id: string): Promise<{ prodotto: Product; suggeriti: Product[] }> {
    const prodotto = await this.productRepository.findOne({
      where: { id },
      relations: ['model'],
    });
  
    if (!prodotto) throw new NotFoundException('Prodotto non trovato');
  
    // Esempio: troviamo "accessori" compatibili per nome
    const suggeriti = await this.productRepository
      .createQueryBuilder('p')
      .leftJoin('p.model', 'mod')
      .where('p.id != :id', { id: prodotto.id }) // esclude sé stesso
      .andWhere('p.name ILIKE :name', { name: `%${prodotto.name}%` }) // compatibilità per nome
      .andWhere('mod.name ILIKE :tipo', { tipo: '%Cover%' }) // sottocategoria "accessori"
      .limit(5)
      .getMany();
  
    return { prodotto, suggeriti };
  }

  private async prelaodCategoryById(id :string) :Promise<Category>{
    const category = await this.categoryRepository.findOne({where : {id}})
    if(category){
      return category
    }
    return this.categoryRepository.create({id})
  }
}
