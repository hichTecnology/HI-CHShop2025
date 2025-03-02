import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@/products/entities/product.entity';

@Injectable()
export class SalesService {
  constructor( 
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale> ,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createSaleDto: CreateSaleDto) {
    const sale = this.saleRepository.create(createSaleDto); 
    return this.saleRepository.save(sale);
  }

  findAll() : Promise<Sale[]> {
    return this.saleRepository.find({relations:{product:true}});
  }

  findOne(id: string) : Promise<Sale>  {
    return this.saleRepository.findOne({where : {id}});
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    const sale =await this.findOne(id); 
    if(!sale){
      throw new NotFoundException(`this user : ${id} is not found`)
    }

    Object.assign(sale, this.saleRepository); 
    return this.saleRepository.save(sale);
  }

  async remove(id: string) {
    const sale = await  this.saleRepository.findOne({where:{id},relations:{product:true}})
    await this.productRepository.update({ sale: sale }, { sale: null });
    return await this.saleRepository.remove(sale)
  }
}
