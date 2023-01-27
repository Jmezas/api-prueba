import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/models/user.entity';
import { UserModel } from '../domain/models/user.model';
import { UserRepository } from '../domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { BaseInfrastructure } from 'src/features/shared/infrastructure/base-infrastructure';

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
