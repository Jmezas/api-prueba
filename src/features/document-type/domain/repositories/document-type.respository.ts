import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { DocumentTypeModel } from '../models/document-type.model';

export interface DocumentTypeRepository
  extends BaseRepository<DocumentTypeModel, string> {}
