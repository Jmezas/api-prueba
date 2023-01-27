import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';

import { AffectationTypeIgvEntity } from '../models/affectation_type_igv.entity';

export interface AffectationTypeIgvRepository
  extends BaseRepository<AffectationTypeIgvEntity, string> {}
