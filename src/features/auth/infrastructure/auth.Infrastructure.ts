import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/features/roles/domain/models/role.entity';
import { ResponseDto } from 'src/features/shared/application/interfaces/dtos/response.dto';
import Result from 'src/features/shared/application/interfaces/result.interface';
import { Trace } from 'src/features/shared/helpers/trace.helper';
import { UserEntity } from 'src/features/users/domain/models/user.entity';
import { PasswordService } from 'src/features/users/domain/services/password.service';
import { TokensService } from 'src/features/users/domain/services/tokens.service';
import { In, Repository } from 'typeorm';
import { AuthModel, MenuModel } from '../domain/models/auth.model';
import { TokensModel } from '../domain/models/tokens.model';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthInfrastructure implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly RoleEntitypository: Repository<RoleEntity>,

    private readonly jwtService: JwtService,
  ) {}
  async login(auth: AuthModel): Promise<Result<TokensModel>> {
    const user = await this.UserRepository.findOne({
      where: { email: auth.email },
      relations: ['roles'],
    });
    if (user) {
      const isPasswordValid = await PasswordService.compareArgon(
        auth.password,
        user.password,
      );
      if (isPasswordValid) {
        const accessToken = this.jwtService.sign({
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles.map((role) => role.name),
        });

        return ResponseDto(Trace.TraceId(), {
          accessToken,
          refreshToken: user.refreshToken,
        });
      } else {
        throw new UnauthorizedException('Invalid email or password', '0001');
      }
    } else {
      throw new UnauthorizedException('Invalid email or password', '0001');
    }
  }
  async getNewAccessToken(refreshToken: string): Promise<Result<TokensModel>> {
    const user = await this.UserRepository.findOne({
      where: { refreshToken, status: true },
      relations: ['roles'],
    });

    if (user) {
      const tokens = TokensService.generateTokens({
        email: user.email,
        name: user.name,
        roles: user.roles.map((role) => role.name),
      });

      user.refreshToken = tokens.refreshToken;
      await this.UserRepository.save(user);

      return ResponseDto(Trace.TraceId(), tokens);
    } else {
      throw new NotFoundException('Not fun user', 'S004');
    }
  }
}
