import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { SubcategoryEntity } from '../domain/models/subcategory.entity';
import { SubcategoryModel } from '../domain/models/subcategory.model';
import { SubCategoryRepository } from '../domain/repositories/subcategory.repository';

@Injectable()
export class SubcategoryInfrastructure
  extends BaseInfrastructure<SubcategoryModel>
  implements SubCategoryRepository
{
  constructor(
    @InjectRepository(SubcategoryEntity)
    private readonly SubCategoryRepository: Repository<SubcategoryEntity>,
  ) {
    super(SubCategoryRepository);
  }
}
