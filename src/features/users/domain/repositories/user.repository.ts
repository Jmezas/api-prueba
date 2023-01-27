import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { UserModel } from '../models/user.model';

export interface UserRepository extends BaseRepository<UserModel, string> {}
