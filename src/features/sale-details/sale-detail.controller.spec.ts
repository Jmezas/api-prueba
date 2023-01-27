import { Test, TestingModule } from '@nestjs/testing';
import { DetailsController } from './sale-detail.controller';
import { DetailsService } from './sale-detail.service';

describe('DetailsController', () => {
  let controller: DetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsController],
      providers: [DetailsService],
    }).compile();

    controller = module.get<DetailsController>(DetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
