import { Test, TestingModule } from '@nestjs/testing';
import { UbigeoController } from './ubigeo.controller';
import { UbigeoService } from './ubigeo.service';

describe('UbigeoController', () => {
  let controller: UbigeoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UbigeoController],
      providers: [UbigeoService],
    }).compile();

    controller = module.get<UbigeoController>(UbigeoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
