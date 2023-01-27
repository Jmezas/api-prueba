import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../domain/models/category.entity';
import { CategoryModel } from '../domain/models/category.model';
import { CategoryRepository } from '../domain/repositories/category.repository';

@Injectable()
export class CategoryInfrastructure
  extends BaseInfrastructure<CategoryModel>
  implements CategoryRepository
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly CategoryRepository: Repository<CategoryEntity>,
  ) {
    super(CategoryRepository);
  }

  async findById(id: number): Promise<CategoryEntity> {
    const _where = Object.assign(id, { status: true });
    const data = await this.CategoryRepository.findOne({ where: _where });
    return data;
  }
}
