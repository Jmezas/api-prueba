import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';

import { WarehouseModel } from '../domain/models/warehouse.model';
import { WarehouseRepository } from '../domain/repositories/warehouse.repository';
import { WarehouseDto } from './dto/dto';

@Injectable()
export class WarehouseApplication extends BaseApplication<WarehouseModel> {
  constructor(
    @Inject(BaseRepository)
    private ubigeoRepository: WarehouseRepository,
  ) {
    super(ubigeoRepository, new WarehouseDto());
  }
}
