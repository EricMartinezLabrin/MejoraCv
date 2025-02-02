import { Test, TestingModule } from '@nestjs/testing';
import { AdsTypeController } from './ads-type.controller';
import { AdsTypeService } from './ads-type.service';

describe('AdsTypeController', () => {
  let controller: AdsTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdsTypeController],
      providers: [AdsTypeService],
    }).compile();

    controller = module.get<AdsTypeController>(AdsTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
