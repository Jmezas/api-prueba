import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { UnitModel } from '../models/unit.model';

export interface UnitRepository extends BaseRepository<UnitModel, string> {}
