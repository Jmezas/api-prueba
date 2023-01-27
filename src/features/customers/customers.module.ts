import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './domain/models/customer.entity';
import { CustomerApplication } from './application/customer.application';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { CustomerInfrastructure } from './infrastructure/customer.infrastructure';
import { UbigeoEntity } from '../ubigeo/domain/models/ubigeo.entity';
import { GeneralEntity } from '../general/domain/models/general.entity';
import { GeneralInfrastructure } from '../general/infrastructure/general.infrastructure';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, UbigeoEntity, GeneralEntity]),
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomerApplication,
    {
      provide: BaseRepository,
      useClass: CustomerInfrastructure,
    },
    {
      provide: 'GeneralRepository',
      useClass: GeneralInfrastructure,
    },
  ],
})
export class CustomersModule {}
