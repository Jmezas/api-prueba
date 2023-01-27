import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { UnitModel } from '../domain/models/unit.model';
import { UnitRepository } from '../domain/repositories/unit.repository';
import { UnitDto } from './dto/dto';

@Injectable()
export class UnitApplication extends BaseApplication<UnitModel> {
  constructor(
    @Inject(BaseRepository)
    categoryRepository: UnitRepository,
  ) {
    super(categoryRepository, new UnitDto());
  }
}
