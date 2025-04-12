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
  @Get(':name/tag/products')
    async getProductsByCategoryAndTag(
  @Param('name') categoryName: string,
  @Query('tag') tagName: string,
    ) {
  return await this.categoriesService.getProductsByCategoryAndTag(categoryName, tagName);
  }

  @Get(':name/products')
  async getProductsFromCategoryWithDetails(
    @Param('name') categoryName: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
  ) {
    return await this.categoriesService.getProductsFromCategoryWithDetails(
      categoryName,
      Number(minPrice),
      Number(maxPrice),
    );
  }

  @Get('/search/:name')
  findCate(@Param('name') name: string) {
    return this.categoriesService.findCate(name);
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
