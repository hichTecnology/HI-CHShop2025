import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from '@/products/entities/product.entity';
import { Tag } from '@/tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category,Product,Tag])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports : [CategoriesService]
})
export class CategoriesModule {}
