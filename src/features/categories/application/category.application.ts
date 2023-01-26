import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from '../../../features/shared/application/interfaces/base-application';
import { BaseRepository } from '../../../features/shared/domain/repositories/base-repository';
import { CategoryModel } from '../domain/models/category.model';
import { CategoryRepository } from '../domain/repositories/category.repository';
import { CategoryDto } from './dto/dto';
@Injectable()
export class CategoryApplication extends BaseApplication<CategoryModel> {
  constructor(
    @Inject(BaseRepository)
    categoryRepository: CategoryRepository,
  ) {
    super(categoryRepository, new CategoryDto());
  }
}
