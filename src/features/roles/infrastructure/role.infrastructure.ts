import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';
import { In, Repository } from 'typeorm';
import { RoleEntity } from '../domain/models/role.entity';
import { RoleModel } from '../domain/models/role.model';
import { RoleRepository } from '../domain/repositories/rolo.repository';

@Injectable()
export class RoleInfrastructure
  extends BaseInfrastructure<RoleModel>
  implements RoleRepository
{
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {
    super(roleRepository);
  }
  async findByIds(ids: number[]): Promise<RoleEntity[]> {
    const result = await this.roleRepository.findBy({ id: In(ids) });

    return result;
  }
}
