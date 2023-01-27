import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { OperationTypeModel } from '../models/operation_type.model';

export interface OperationTypeRepository
  extends BaseRepository<OperationTypeModel, string> {}
