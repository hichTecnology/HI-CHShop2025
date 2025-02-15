import { Test, TestingModule } from '@nestjs/testing';
import { ProductViewsController } from './product_views.controller';
import { ProductViewsService } from './product_views.service';

describe('ProductViewsController', () => {
  let controller: ProductViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductViewsController],
      providers: [ProductViewsService],
    }).compile();

    controller = module.get<ProductViewsController>(ProductViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
