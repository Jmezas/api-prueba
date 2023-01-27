import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { GeneralModel } from '../models/general.model';

export interface GeneralRepository
  extends BaseRepository<GeneralModel, string> {}
