import { Test, TestingModule } from '@nestjs/testing';
import { ProductViewsService } from './product_views.service';

describe('ProductViewsService', () => {
  let service: ProductViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductViewsService],
    }).compile();

    service = module.get<ProductViewsService>(ProductViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
