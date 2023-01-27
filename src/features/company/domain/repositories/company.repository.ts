import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { CompanyModel } from '../models/company.model';

export interface CompanyRepository
  extends BaseRepository<CompanyModel, string> {}
