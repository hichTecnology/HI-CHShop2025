import { Test, TestingModule } from '@nestjs/testing';
import { ProductMediasService } from './product_medias.service';

describe('ProductMediasService', () => {
  let service: ProductMediasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMediasService],
    }).compile();

    service = module.get<ProductMediasService>(ProductMediasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
