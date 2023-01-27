import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';

import { MovementDetailModel } from '../domain/models/movement-detail.model';
import { MovementDetailRepository } from '../domain/repositories/movement-detail.repository';
import { MovementDetailDto } from './dto/dto';

@Injectable()
export class MovementDetailApplication extends BaseApplication<MovementDetailModel> {
  constructor(
    @Inject(BaseRepository)
    detailRepository: MovementDetailRepository,
  ) {
    super(detailRepository, new MovementDetailDto());
  }
}
