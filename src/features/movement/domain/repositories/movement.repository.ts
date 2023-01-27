import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { MovementModel } from '../models/movement.model';

export interface MovementRepository
  extends BaseRepository<MovementModel, string> {
  insertMovement(sale: MovementModel): Promise<MovementModel>;
  findBylast(): Promise<MovementModel>;
}
