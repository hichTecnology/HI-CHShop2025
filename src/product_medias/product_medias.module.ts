import { Module } from '@nestjs/common';
import { ProductMediasService } from './product_medias.service';
import { ProductMediasController } from './product_medias.controller';
import { ProductMedia } from './entities/product_media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMedia])],
  controllers: [ProductMediasController],
  providers: [ProductMediasService],
})
export class ProductMediasModule {}
