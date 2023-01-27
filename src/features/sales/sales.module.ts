import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SaleApplication } from './application/sale.application';
import { SaleInfrastructure } from './infrastructure/sales.infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './domain/models/sale.entity';
import { SaleDetailInfrastructure } from '../sale-details/infrastructure/sale-detail.infrastructute';
import { SaleDetailEntity } from '../sale-details/domain/models/sale-detail.entity';
import { CustomerInfrastructure } from '../customers/infrastructure/customer.infrastructure';
import { CustomerEntity } from '../customers/domain/models/customer.entity';
import { DocumentTypeInfrastructure } from '../document-type/infrastructure/document-type.infrastructure';
import { DocumentTypeEntity } from '../document-type/domain/models/document-type.entity';
import { GeneralEntity } from '../general/domain/models/general.entity';
import { GeneralInfrastructure } from '../general/infrastructure/general.infrastructure';
import { WarehouseStockEntity } from '../products/domain/models/warehouse_stock.entity';
import { MovementEntity } from '../movement/domain/models/movement.entity';
import { MovementDetailEntity } from '../movement-detail/domain/models/movement-detail.entity';
import { MovementInfrastructure } from '../movement/infrastructure/movement.infrastructure';
import { MovementDetailInfrastructure } from '../movement-detail/infrastructure/movement-detail.infrastructure';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SaleEntity,
      SaleDetailEntity,
      CustomerEntity,
      DocumentTypeEntity,
      GeneralEntity,
      WarehouseStockEntity,
      MovementEntity,
      MovementDetailEntity,
    ]),
  ],
  controllers: [SalesController],
  providers: [
    SalesService,
    SaleApplication,
    {
      provide: 'SaleRepository',
      useClass: SaleInfrastructure,
    },
    {
      provide: 'SaleDetailRepository',
      useClass: SaleDetailInfrastructure,
    },
    {
      provide: 'CustomerRepository',
      useClass: CustomerInfrastructure,
    },
    {
      provide: 'DocumentTypeRepository',
      useClass: DocumentTypeInfrastructure,
    },
    {
      provide: 'GeneralRepository',
      useClass: GeneralInfrastructure,
    },
    {
      provide: 'MovementRepository',
      useClass: MovementInfrastructure,
    },
    {
      provide: 'MovementDetailRepository',
      useClass: MovementDetailInfrastructure,
    },
  ],
})
export class SalesModule {}
