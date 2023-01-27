import { Module } from '@nestjs/common';
import { OperationTypeService } from './operation_type.service';
import { OperationTypeController } from './operation_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationTypeEntity } from './domain/models/operation_type.entity';
import { OperationTypeApplication } from './application/operation_type.application';
import { OperationTypeInfrastructure } from './infrastructure/operation_type.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';

@Module({
  imports: [TypeOrmModule.forFeature([OperationTypeEntity])],
  controllers: [OperationTypeController],
  providers: [
    OperationTypeService,
    OperationTypeApplication,
    {
      provide: BaseRepository,
      useClass: OperationTypeInfrastructure,
    },
  ],
})
export class OperationTypeModule {}
