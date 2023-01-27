import { Inject, Injectable } from '@nestjs/common';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { UserModel } from '../domain/models/user.model';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserDTO } from './dto/dto';
import { WarehouseRepository } from 'src/features/warehouse/domain/repositories/warehouse.repository';
import { BaseApplication } from 'src/features/shared/application/interfaces/base-application';
import { RoleRepository } from 'src/features/roles/domain/repositories/rolo.repository';

@Injectable()
export class UserApplication extends BaseApplication<UserModel> {
  constructor(
    @Inject('UserRepository')
    private UserRepository: UserRepository,

    @Inject('RoleRepository')
    private RoleRepository: RoleRepository,

    @Inject('WarehouseRepository')
    private WarehouseRepository: WarehouseRepository,
  ) {
    super(UserRepository, new UserDTO());
  }
  override async add(entity: UserModel): Promise<Result<UserModel>> {
    if (entity.roles.length > 0) {
      const roles = await this.RoleRepository.findByIds(
        entity.roles as number[],
      );
      entity.roles = roles;
    } else {
      delete entity.roles;
    }

    if (entity.warehouses.length > 0) {
      const warehouses = await this.WarehouseRepository.findByIds(
        entity.warehouses as number[],
      );
      entity.warehouses = warehouses;
    } else {
      delete entity.warehouses;
    }

    const result = await this.UserRepository.insert(entity);
    return new UserDTO().mapping(result);
  }
  async update(
    entity: UserModel,
    where: object,
    relations: string[],
  ): Promise<Result<UserModel>> {
    if (entity.roles.length > 0) {
      const roles = await this.RoleRepository.findByIds(
        entity.roles as number[],
      );
      entity.roles = roles;
    } else {
      delete entity.roles;
    }

    if (entity.warehouses.length > 0) {
      const warehouses = await this.WarehouseRepository.findByIds(
        entity.warehouses as number[],
      );
      entity.warehouses = warehouses;
    } else {
      delete entity.warehouses;
    }

    const result = await this.UserRepository.update(entity, where, relations);
    return new UserDTO().mapping(result);
  }

  override async getPage(
    page: number,
    pagesize: number,
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string },
  ): Promise<Result<UserModel>> {
    const result = await this.UserRepository.getPage(
      page,
      pagesize,
      where,
      relations,
      order,
    );

    return new UserDTO().mapping(result);
  }
}
