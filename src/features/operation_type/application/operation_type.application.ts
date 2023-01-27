import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';

import { OperationTypeModel } from '../domain/models/operation_type.model';
import { OperationTypeRepository } from '../domain/repositories/operation_type.repository';
import { OperationTypeDto } from './dto/dto';

@Injectable()
export class OperationTypeApplication extends BaseApplication<OperationTypeModel> {
  constructor(
    @Inject(BaseRepository)
    detailRepository: OperationTypeRepository,
  ) {
    super(detailRepository, new OperationTypeDto());
  }
}
