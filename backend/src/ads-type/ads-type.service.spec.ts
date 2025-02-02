import { Test, TestingModule } from '@nestjs/testing';
import { AdsTypeService } from './ads-type.service';

describe('AdsTypeService', () => {
  let service: AdsTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdsTypeService],
    }).compile();

    service = module.get<AdsTypeService>(AdsTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
