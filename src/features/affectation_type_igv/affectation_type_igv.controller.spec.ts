import { Test, TestingModule } from '@nestjs/testing';
import { AffectationTypeIgvController } from './affectation_type_igv.controller';
import { AffectationTypeIgvService } from './affectation_type_igv.service';

describe('AffectationTypeIgvController', () => {
  let controller: AffectationTypeIgvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AffectationTypeIgvController],
      providers: [AffectationTypeIgvService],
    }).compile();

    controller = module.get<AffectationTypeIgvController>(AffectationTypeIgvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
