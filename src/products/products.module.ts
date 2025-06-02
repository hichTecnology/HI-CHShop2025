import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from '@/colors/entities/color.entity';
import { Size } from '@/sizes/entities/size.entity';
import { Variente } from '@/varientes/entities/variente.entity';
import { Tag } from '@/tags/entities/tag.entity';
import { ProductMedia } from '@/product_medias/entities/product_media.entity';
import { Category } from '@/categories/entities/category.entity';
import { Model } from '@/model/entities/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,Color,Size,Variente,Tag,ProductMedia,Category,Model,Module])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
