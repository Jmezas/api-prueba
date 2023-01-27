import { Test, TestingModule } from '@nestjs/testing';
import { OperationTypeController } from './operation_type.controller';
import { OperationTypeService } from './operation_type.service';

describe('OperationTypeController', () => {
  let controller: OperationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationTypeController],
      providers: [OperationTypeService],
    }).compile();

    controller = module.get<OperationTypeController>(OperationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
