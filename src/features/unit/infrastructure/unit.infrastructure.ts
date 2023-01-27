import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { UnitEntity } from '../domain/models/unit.entity';
import { UnitModel } from '../domain/models/unit.model';
import { UnitRepository } from '../domain/repositories/unit.repository';

@Injectable()
export class UnitInfrastructure
  extends BaseInfrastructure<UnitModel>
  implements UnitRepository
{
  constructor(
    @InjectRepository(UnitEntity)
    private readonly UnitRepository: Repository<UnitEntity>,
  ) {
    super(UnitRepository);
  }
}
