import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/models/product.entity';
import { ProductApplication } from './application/product.application';
import { ProductInfrastructure } from './infrastructure/product.infrastructure';
import { UnitEntity } from '../unit/domain/models/unit.entity';
import { WarehouseStockEntity } from './domain/models/warehouse_stock.entity';
import { AffectationTypeIgvEntity } from '../affectation_type_igv/domain/models/affectation_type_igv.entity';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      UnitEntity,
      WarehouseStockEntity,
      AffectationTypeIgvEntity,
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductApplication,
    {
      provide: BaseRepository,
      useClass: ProductInfrastructure,
    },
  ],
})
export class ProductsModule {}
