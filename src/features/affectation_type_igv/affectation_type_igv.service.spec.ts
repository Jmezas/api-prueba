import { Test, TestingModule } from '@nestjs/testing';
import { AffectationTypeIgvService } from './affectation_type_igv.service';

describe('AffectationTypeIgvService', () => {
  let service: AffectationTypeIgvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AffectationTypeIgvService],
    }).compile();

    service = module.get<AffectationTypeIgvService>(AffectationTypeIgvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
