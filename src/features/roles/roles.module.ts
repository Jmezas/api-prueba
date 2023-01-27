import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './domain/models/role.entity';
import { RoleInfrastructure } from './infrastructure/role.infrastructure';
import { BaseRepository } from '../shared/domain/repositories/base-repository';
import { RoleApplication } from './application/role.application';
import { MenuEntity } from '../menu/domain/models/menu.entity';
import { MenuInfrastructure } from '../menu/infrastructure/menu.infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, MenuEntity])],
  controllers: [RolesController],
  providers: [
    RolesService,
    RoleApplication,
    {
      provide: 'RoleRepository',
      useClass: RoleInfrastructure,
    },
    {
      provide: 'MenuRepository',
      useClass: MenuInfrastructure,
    },
  ],
})
export class RolesModule {}
