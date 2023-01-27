import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { CategoryEntity } from '../models/category.entity';
import { CategoryModel } from '../models/category.model';

export interface CategoryRepository
  extends BaseRepository<CategoryModel, string> {
  findById(ids: number): Promise<CategoryEntity>;
}
