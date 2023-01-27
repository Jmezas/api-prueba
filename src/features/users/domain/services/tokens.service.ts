import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../models/user.model';
// import * as jwt from 'jwt-simple';
// import * as moment from 'moment';
import { ITokens } from '../models/tokens.interface';

import { ResponseValidateToken } from 'src/features/shared/types/response-validate-token.type';
import {
  TOKEN_ERROR,
  TOKEN_ERROR_MESSAGE,
} from 'src/features/shared/enum/token-error.enum';

export class TokensService {
  static generateRefreshToken(): string {
    return uuidv4();
  }

  // static generateAccessToken(user: Partial<UserModel>): string {
  //   const payload = {
  //     id: user.id,
  //     email: user.email,
  //     name: user.name,
  //     roles: user.roles,
  //     warehouses: user.warehouses,
  //     iat: moment().unix(),
  //     exp: moment().add(process.env.TIMEOUT, 'seconds').unix(),
  //   };
  //   // return JwtService.sign(payload);
  //   return jwt.encode(payload, process.env.KEYWORD);
  // }

  static generateTokens(user: Partial<UserModel>): ITokens {
    const refreshToken = TokensService.generateRefreshToken();
    const accessToken = ''; //TokensService.generateAccessToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }
}
