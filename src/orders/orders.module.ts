import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '@/carts/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order,Cart])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
