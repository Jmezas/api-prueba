import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseEntity } from './domain/models/warehouse.entity';
import { WarehouseApplication } from './application/warehouse.application';
import { WarehouseInfrastructure } from './infrastructure/warehouse.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { UserEntity } from '../users/domain/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseEntity, UserEntity])],
  controllers: [WarehouseController],
  providers: [
    WarehouseService,
    WarehouseApplication,
    {
      provide: BaseRepository,
      useClass: WarehouseInfrastructure,
    },
  ],
})
export class WarehouseModule {}
