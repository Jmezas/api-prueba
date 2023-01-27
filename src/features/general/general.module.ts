import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralEntity } from './domain/models/general.entity';
import { GeneralApplication } from './application/general.application';
import { GeneralInfrastructure } from './infrastructure/general.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralEntity])],
  controllers: [GeneralController],
  providers: [
    GeneralService,
    GeneralApplication,
    {
      provide: BaseRepository,
      useClass: GeneralInfrastructure,
    },
  ],
})
export class GeneralModule {}
