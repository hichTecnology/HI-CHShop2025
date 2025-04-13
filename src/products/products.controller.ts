import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('/search/products')
  async getProducts(
    @Query('minPrice') minPrice: string, // Parametri dalla query string
    @Query('maxPrice') maxPrice: string,
  ) {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    return this.productsService.getProductsByPriceRange(min, max);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Get('/page/price/products')
  async getProductsLimit(
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    const currentPage = parseInt(page, 10) || 1; // Valore predefinito: pagina 1
    const pageSize = parseInt(limit, 10) || 10; // Valore predefinito: 10 risultati per pagina

    return this.productsService.getProductsByPriceRangePaginated(min, max, currentPage, pageSize);
  }
  @Get('/page/products')
  async getProductsPage(
   
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    
    const currentPage = parseInt(page, 10) || 1; // Valore predefinito: pagina 1
    const pageSize = parseInt(limit, 10) || 10; // Valore predefinito: 10 risultati per pagina

    return this.productsService.getProductsByPaginated( currentPage, pageSize);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
