import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale,Product])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
