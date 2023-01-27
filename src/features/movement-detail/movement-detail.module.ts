import { Module } from '@nestjs/common';
import { MovementDetailService } from './movement-detail.service';
import { MovementDetailController } from './movement-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementDetailEntity } from './domain/models/movement-detail.entity';
import { MovementDetailApplication } from './application/movement-detail.application';
import { MovementDetailInfrastructure } from './infrastructure/movement-detail.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { WarehouseStockEntity } from '../products/domain/models/warehouse_stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovementDetailEntity, WarehouseStockEntity]),
  ],
  controllers: [MovementDetailController],
  providers: [
    MovementDetailService,
    MovementDetailApplication,
    {
      provide: BaseRepository,
      useClass: MovementDetailInfrastructure,
    },
  ],
})
export class MovementDetailModule {}
