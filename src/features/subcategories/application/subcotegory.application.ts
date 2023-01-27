import { Inject, Injectable } from '@nestjs/common';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';

import { SubcategoryModel } from '../domain/models/subcategory.model';
import { SubCategoryRepository } from '../domain/repositories/subcategory.repository';
import { SubcategoryDto } from './dto/dto';

@Injectable()
export class SubcategoryApplication extends BaseApplication<SubcategoryModel> {
  constructor(
    @Inject('SubCategoryRepository')
    private subcategoryRepository: SubCategoryRepository /*@Inject('CategoryRepository')
    private categoryRepository: CategoryRepository,*/,
  ) {
    super(subcategoryRepository, new SubcategoryDto());
  }
  /* override async add(
    entity: SubcategoryModel,
  ): Promise<Result<SubcategoryModel>> {
     if (entity.category != 0) {
      const category = await this.categoryRepository.findById(
        entity.category as number,
      );
      console.log(category);
      entity.category = category[0];
    } else {
      delete entity.category;
    } 
    const result = await this.subcategoryRepository.insert(entity);
    return new SubcategoryDto().mapping(result);
  }*/
}
