import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/models/user.entity';
import { UserApplication } from './application/user.application';
import { UserInfrastructure } from './infrastructure/user.infrastructure';
import { RoleEntity } from '../roles/domain/models/role.entity';
import { RoleInfrastructure } from '../roles/infrastructure/role.infrastructure';
import { WarehouseEntity } from '../warehouse/domain/models/warehouse.entity';
import { WarehouseInfrastructure } from '../warehouse/infrastructure/warehouse.infrastructure';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, WarehouseEntity]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserApplication,
    {
      provide: 'UserRepository',
      useClass: UserInfrastructure,
    },
    {
      provide: 'RoleRepository',
      useClass: RoleInfrastructure,
    },
    {
      provide: 'WarehouseRepository',
      useClass: WarehouseInfrastructure,
    },
  ],
})
export class UsersModule {}
