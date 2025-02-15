import { Test, TestingModule } from '@nestjs/testing';
import { VarientesService } from './varientes.service';

describe('VarientesService', () => {
  let service: VarientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VarientesService],
    }).compile();

    service = module.get<VarientesService>(VarientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
