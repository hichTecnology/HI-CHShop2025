import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductViewsService } from './product_views.service';
import { CreateProductViewDto } from './dto/create-product_view.dto';
import { UpdateProductViewDto } from './dto/update-product_view.dto';

@Controller('product-views')
export class ProductViewsController {
  constructor(private readonly productViewsService: ProductViewsService) {}

  @Post()
  create(@Body() createProductViewDto: CreateProductViewDto) {
    return this.productViewsService.create(createProductViewDto);
  }

  @Get()
  findAll() {
    return this.productViewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productViewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductViewDto: UpdateProductViewDto) {
    return this.productViewsService.update(+id, updateProductViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productViewsService.remove(+id);
  }
}
