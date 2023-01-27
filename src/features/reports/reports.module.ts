import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SaleApplication } from '../sales/application/sale.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from '../sales/domain/models/sale.entity';
import { SaleInfrastructure } from '../sales/infrastructure/sales.infrastructure';
import { SaleDetailEntity } from '../sale-details/domain/models/sale-detail.entity';
import { CustomerEntity } from '../customers/domain/models/customer.entity';
import { DocumentTypeEntity } from '../document-type/domain/models/document-type.entity';
import { GeneralEntity } from '../general/domain/models/general.entity';
import { WarehouseStockEntity } from '../products/domain/models/warehouse_stock.entity';
import { MovementEntity } from '../movement/domain/models/movement.entity';
import { MovementDetailEntity } from '../movement-detail/domain/models/movement-detail.entity';
import { CustomerInfrastructure } from '../customers/infrastructure/customer.infrastructure';
import { DocumentTypeInfrastructure } from '../document-type/infrastructure/document-type.infrastructure';
import { GeneralInfrastructure } from '../general/infrastructure/general.infrastructure';
import { MovementDetailInfrastructure } from '../movement-detail/infrastructure/movement-detail.infrastructure';
import { MovementInfrastructure } from '../movement/infrastructure/movement.infrastructure';
import { SaleDetailInfrastructure } from '../sale-details/infrastructure/sale-detail.infrastructute';
import { CompanyEntity } from '../company/domain/models/company.entity';
import { CompanyApplication } from '../company/application/company.application';
import { CompanyInfrastructure } from '../company/infrastructure/company.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';

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
      CompanyEntity,
    ]),
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService,
    SaleApplication,
    CompanyApplication,
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
    {
      provide: BaseRepository,
      useClass: CompanyInfrastructure,
    },
  ],
})
export class ReportsModule {}
