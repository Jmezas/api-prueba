import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { MovementDetailModel } from '../models/movement-detail.model';

export interface MovementDetailRepository
  extends BaseRepository<MovementDetailModel, string> {
  insertDetail(entity: MovementDetailModel): Promise<MovementDetailModel>;
}
