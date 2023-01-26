import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/features/shared/domain/repositories/base-repository';
import { AuthModel } from '../domain/models/auth.model';
import { AuthRepository } from '../domain/repositories/auth.repository';

@Injectable()
export class AuthApplication {
  constructor(
    @Inject(BaseRepository)
    readonly repository: AuthRepository,
  ) {}

  login(auth: AuthModel) {
    return this.repository.login(auth);
  }

  getNewAccessToken(refreshToken: string) {
    return this.repository.getNewAccessToken(refreshToken);
  }
}
