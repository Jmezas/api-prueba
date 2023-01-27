import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryEntity } from './domain/models/subcategory.entity';
import { SubcategoryApplication } from './application/subcotegory.application';
import { SubcategoryInfrastructure } from './infrastructure/subcategory.infrastucture';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { CategoryEntity } from '../categories/domain/models/category.entity';
import { CategoryApplication } from '../categories/application/category.application';
import { CategoryInfrastructure } from '../categories/infrastructure/category.infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryEntity, CategoryEntity])],
  controllers: [SubcategoriesController],
  providers: [
    SubcategoriesService,
    SubcategoryApplication,
    {
      provide: 'SubCategoryRepository',
      useClass: SubcategoryInfrastructure,
    },
    /*{
      provide: 'CategoryRepository',
      useClass: CategoryInfrastructure,
    },*/
  ],
})
export class SubcategoriesModule {}
