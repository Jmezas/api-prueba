import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { SubcategoryModel } from '../models/subcategory.model';

export interface SubCategoryRepository
  extends BaseRepository<SubcategoryModel, string> {}
