import { Inject, Injectable } from '@nestjs/common';

import Result from 'src/features/shared/application/interfaces/result.interface';
import { BaseApplication } from '../../../features/shared/application/interfaces/base-application';
import { BaseRepository } from '../../../features/shared/domain/repositories/base-repository';
import { RoleModel } from '../domain/models/role.model';
import { RoleRepository } from '../domain/repositories/rolo.repository';
import { RoleDto } from './dto/dto';

@Injectable()
export class RoleApplication extends BaseApplication<RoleModel> {
  constructor(
    @Inject('RoleRepository')
    private RoleRepository: RoleRepository,
  ) {
    super(RoleRepository, new RoleDto());
  }
  override async add(entity: RoleModel): Promise<Result<RoleModel>> {
    const result = await this.RoleRepository.insert(entity);
    return new RoleDto().mapping(result);
  }
  override async update(
    entity: RoleModel,
    where: object,
    relations: string[],
  ): Promise<Result<RoleModel>> {
    const result = await this.RoleRepository.update(entity, where, relations);
    return new RoleDto().mapping(result);
  }
}
