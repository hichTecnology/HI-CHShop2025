import { Module } from '@nestjs/common';
import { ProductViewsService } from './product_views.service';
import { ProductViewsController } from './product_views.controller';

@Module({
  controllers: [ProductViewsController],
  providers: [ProductViewsService],
})
export class ProductViewsModule {}
