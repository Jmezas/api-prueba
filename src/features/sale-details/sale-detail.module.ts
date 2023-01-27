import { Module } from '@nestjs/common';
import { DetailsService } from './sale-detail.service';
import { DetailsController } from './sale-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetailEntity } from './domain/models/sale-detail.entity';
import { SaleDetailApplication } from './application/sale-detail.application';
import { SaleDetailInfrastructure } from './infrastructure/sale-detail.infrastructute';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { WarehouseStockEntity } from '../products/domain/models/warehouse_stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleDetailEntity, WarehouseStockEntity])],
  controllers: [DetailsController],
  providers: [
    DetailsService,
    SaleDetailApplication,
    {
      provide: BaseRepository,
      useClass: SaleDetailInfrastructure,
    },
  ],
})
export class DetailsModule {}
