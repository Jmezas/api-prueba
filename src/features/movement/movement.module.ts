import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementEntity } from './domain/models/movement.entity';
import { MovementApplication } from './application/movement.application';
import { MovementInfrastructure } from './infrastructure/movement.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { MovementDetailEntity } from '../movement-detail/domain/models/movement-detail.entity';
import { MovementDetailInfrastructure } from '../movement-detail/infrastructure/movement-detail.infrastructure';
import { WarehouseStockEntity } from '../products/domain/models/warehouse_stock.entity';
import { GeneralInfrastructure } from '../general/infrastructure/general.infrastructure';
import { GeneralEntity } from '../general/domain/models/general.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovementEntity,
      MovementDetailEntity,
      WarehouseStockEntity,
      GeneralEntity,
    ]),
  ],
  controllers: [MovementController],
  providers: [
    MovementService,
    MovementApplication,
    {
      provide: BaseRepository,
      useClass: MovementInfrastructure,
    },
    {
      provide: 'MovementDetailRepository',
      useClass: MovementDetailInfrastructure,
    },
    {
      provide: 'GeneralRepository',
      useClass: GeneralInfrastructure,
    },
  ],
})
export class MovementModule {}
