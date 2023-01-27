import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { WarehouseEntity } from '../models/warehouse.entity';
import { WarehouseModel } from '../models/warehouse.model';

export interface WarehouseRepository
  extends BaseRepository<WarehouseModel, string> {
  findByIds(ids: number[]): Promise<WarehouseEntity[]>;
}
