import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './domain/models/menu.entity';
import { MenuApplication } from './application/menu.application';
import { MenuInfrastructure } from './infrastructure/menu.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenuController],
  providers: [
    MenuService,
    MenuApplication,
    {
      provide: BaseRepository,
      useClass: MenuInfrastructure,
    },
  ],
})
export class MenuModule {}
