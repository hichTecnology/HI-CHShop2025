import { Test, TestingModule } from '@nestjs/testing';
import { ProductMediasController } from './product_medias.controller';
import { ProductMediasService } from './product_medias.service';

describe('ProductMediasController', () => {
  let controller: ProductMediasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductMediasController],
      providers: [ProductMediasService],
    }).compile();

    controller = module.get<ProductMediasController>(ProductMediasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
