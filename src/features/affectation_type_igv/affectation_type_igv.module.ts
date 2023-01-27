import { Module } from '@nestjs/common';
import { AffectationTypeIgvService } from './affectation_type_igv.service';
import { AffectationTypeIgvController } from './affectation_type_igv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffectationTypeIgvEntity } from './domain/models/affectation_type_igv.entity';
import { AffectationTypeIgvApplication } from './application/affectation_type_igv.application';
import { AffectationTypeIgvInfrastructure } from './infrastructure/affectation_type_igv.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';

@Module({
  imports: [TypeOrmModule.forFeature([AffectationTypeIgvEntity])],
  controllers: [AffectationTypeIgvController],
  providers: [
    AffectationTypeIgvService,
    AffectationTypeIgvApplication,
    {
      provide: BaseRepository,
      useClass: AffectationTypeIgvInfrastructure,
    },
  ],
})
export class AffectationTypeIgvModule {}
