import { Injectable } from '@nestjs/common';
import { AuthApplication } from './application/auth.application';
import { CreateAuthDto } from './application/dto/create-auth.dto';
import { UpdateAuthDto } from './application/dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private application: AuthApplication) {}
  async login(createAuthDto: CreateAuthDto) {
    const email = createAuthDto.email;
    const password = createAuthDto.password;
    const result = await this.application.login({ email, password });
    return result;
  }

  async getNewAccessToken(refreshToken: string) {
    const result = await this.application.getNewAccessToken(refreshToken);
    return result;
  }
}
