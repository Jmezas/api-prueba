import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from './domain/models/unit.entity';
import { UnitApplication } from './application/unit.application';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { UnitInfrastructure } from './infrastructure/unit.infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([UnitEntity])],
  controllers: [UnitController],
  providers: [
    UnitService,
    UnitApplication,
    {
      provide: BaseRepository,
      useClass: UnitInfrastructure,
    },
  ],
})
export class UnitModule {}
