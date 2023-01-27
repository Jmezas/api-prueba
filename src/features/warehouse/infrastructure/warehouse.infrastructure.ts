import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { In, Repository } from 'typeorm';
import { WarehouseEntity } from '../domain/models/warehouse.entity';
import { WarehouseModel } from '../domain/models/warehouse.model';
import { WarehouseRepository } from '../domain/repositories/warehouse.repository';

@Injectable()
export class WarehouseInfrastructure
  extends BaseInfrastructure<WarehouseModel>
  implements WarehouseRepository
{
  constructor(
    @InjectRepository(WarehouseEntity)
    private readonly Repository: Repository<WarehouseEntity>,
  ) {
    super(Repository as any);
  }
  async findByIds(ids: number[]): Promise<WarehouseEntity[]> {
    const result = await this.Repository.findBy({ id: In(ids) });

    return result;
  }
}
