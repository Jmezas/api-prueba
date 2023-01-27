import { Module } from '@nestjs/common';
import { UbigeoService } from './ubigeo.service';
import { UbigeoController } from './ubigeo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbigeoEntity } from './domain/models/ubigeo.entity';
import { UbigeoApplication } from './application/ubigeo.application';
import { UbigeoInfrastructure } from './infrastructure/ubigeo.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';

@Module({
  imports: [TypeOrmModule.forFeature([UbigeoEntity])],
  controllers: [UbigeoController],
  providers: [
    UbigeoService,
    UbigeoApplication,
    {
      provide: BaseRepository,
      useClass: UbigeoInfrastructure,
    },
  ],
})
export class UbigeoModule {}
