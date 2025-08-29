import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('/filter/:grado')
  findGrade(
    @Param('grado') grado: number
  ) {
    return this.categoriesService.findGrade(grado);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Get(':id/tag/products')
    async getProductsByCategoryAndTag(
  @Param('id') categoryId: string,
  @Query('tag') tagName: string,
    ) {
  return await this.categoriesService.getProductsByCategoryAndTag(categoryId, tagName);
  }

  @Get(':id/model/products')
    async getProductsByCategoryAndModel(
  @Param('id') categoryId: string,
  @Query('model') modelName: string,
    ) {
  return await this.categoriesService.getProductsByCategoryAndModel(categoryId, modelName);
  }

  @Get(':id/products')
  async getProductsFromCategoryWithDetails(
    @Param('id') categoryId: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
  ) {
    return await this.categoriesService.getProductsFromCategoryWithDetails(
      categoryId,
      Number(minPrice),
      Number(maxPrice),
    );
  }

  @Get(':name/all/products')
getProdotti(@Param('name') name: string) {
  return this.categoriesService.getProdottiByCategoriaId(name);
}

  @Get('/search/:name')
  searchCate(@Param('name') name: string) {
    return this.categoriesService.searchCate(name);
  }
  @Get('/find/:name')
  findCateModel(@Param('name') name: string) {
    return this.categoriesService.findCateModel(name);
  }

  @Get('/find/id/:id')
  findCateModelId(@Param('id') id: string) {
    return this.categoriesService.findCateModelId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
