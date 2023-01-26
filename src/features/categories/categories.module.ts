import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryApplication } from './application/category.application';
import { CategoryInfrastructure } from './infrastructure/category.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './domain/models/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoryApplication,
    {
      provide: BaseRepository,
      useClass: CategoryInfrastructure,
    },
  ],
})
export class CategoriesModule {}
