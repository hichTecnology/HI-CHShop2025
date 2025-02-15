import { Test, TestingModule } from '@nestjs/testing';
import { VarientesController } from './varientes.controller';
import { VarientesService } from './varientes.service';

describe('VarientesController', () => {
  let controller: VarientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VarientesController],
      providers: [VarientesService],
    }).compile();

    controller = module.get<VarientesController>(VarientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
