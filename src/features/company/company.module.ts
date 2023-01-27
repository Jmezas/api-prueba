import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './domain/models/company.entity';
import { CompanyApplication } from './application/company.application';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { CompanyInfrastructure } from './infrastructure/company.infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyApplication,
    {
      provide: BaseRepository,
      useClass: CompanyInfrastructure,
    },
  ],
})
export class CompanyModule {}
