import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './core/database/config.service';
import { AffectationTypeIgvModule } from './features/affectation_type_igv/affectation_type_igv.module';
import { AuthModule } from './features/auth/auth.module';
import { CategoriesModule } from './features/categories/categories.module';
import { CompanyModule } from './features/company/company.module';
import { CustomersModule } from './features/customers/customers.module';
import { DocumentTypeModule } from './features/document-type/document-type.module';
import { GeneralModule } from './features/general/general.module';
import { MenuModule } from './features/menu/menu.module';
import { MovementDetailModule } from './features/movement-detail/movement-detail.module';
import { MovementModule } from './features/movement/movement.module';
import { OperationTypeModule } from './features/operation_type/operation_type.module';
import { ProductsModule } from './features/products/products.module';
import { ReportsModule } from './features/reports/reports.module';
import { RolesModule } from './features/roles/roles.module';
import { DetailsModule } from './features/sale-details/sale-detail.module';
import { SalesModule } from './features/sales/sales.module';
import { SubcategoriesModule } from './features/subcategories/subcategories.module';
import { UbigeoModule } from './features/ubigeo/ubigeo.module';
import { UnitModule } from './features/unit/unit.module';
import { UsersModule } from './features/users/users.module';
import { WarehouseModule } from './features/warehouse/warehouse.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ConfigModule.forRoot(),
    ProductsModule,
    CategoriesModule,
    CustomersModule,
    SalesModule,
    DocumentTypeModule,
    GeneralModule,
    SubcategoriesModule,
    DetailsModule,
    UbigeoModule,
    UnitModule,
    UsersModule,
    RolesModule,
    AuthModule,
    CompanyModule,
    WarehouseModule,
    MovementModule,
    MovementDetailModule,
    OperationTypeModule,
    AffectationTypeIgvModule,
    ReportsModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
