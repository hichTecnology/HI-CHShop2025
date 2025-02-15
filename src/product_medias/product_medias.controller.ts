import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductMediasService } from './product_medias.service';
import { CreateProductMediaDto } from './dto/create-product_media.dto';
import { UpdateProductMediaDto } from './dto/update-product_media.dto';

@Controller('product-medias')
export class ProductMediasController {
  constructor(private readonly productMediasService: ProductMediasService) {}

  @Post()
  create(@Body() createProductMediaDto: CreateProductMediaDto) {
    return this.productMediasService.create(createProductMediaDto);
  }

  @Get()
  findAll() {
    return this.productMediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productMediasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductMediaDto: UpdateProductMediaDto) {
    return this.productMediasService.update(id, updateProductMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productMediasService.remove(id);
  }
}
