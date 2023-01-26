import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfrastructure } from '../../shared/infrastructure/base-infrastructure';
import { UserEntity } from '../domain/models/user.entity';
import { UserModel } from '../domain/models/user.model';
import { UserRepository } from '../domain/repositories/user.repository';
import { Repository } from 'typeorm';

export class UserInfrastructure
  extends BaseInfrastructure<UserModel>
  implements UserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {
    super(UserRepository as any);
  }
}
