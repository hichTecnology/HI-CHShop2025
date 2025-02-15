import { Injectable } from '@nestjs/common';
import { CreateProductViewDto } from './dto/create-product_view.dto';
import { UpdateProductViewDto } from './dto/update-product_view.dto';

@Injectable()
export class ProductViewsService {
  create(createProductViewDto: CreateProductViewDto) {
    return 'This action adds a new productView';
  }

  findAll() {
    return `This action returns all productViews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productView`;
  }

  update(id: number, updateProductViewDto: UpdateProductViewDto) {
    return `This action updates a #${id} productView`;
  }

  remove(id: number) {
    return `This action removes a #${id} productView`;
  }
}
