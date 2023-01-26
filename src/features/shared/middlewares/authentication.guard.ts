import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { Observable } from 'rxjs';
// import { TokensService } from 'src/features/users/domain/services/tokens.service';
import { IError } from '../helpers/errors.helper';

@Injectable()
export class Authentication implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const next = context.switchToHttp().getNext();
    const auth = request.get('Authorization');
    return true;
    // if (auth) {
    //   const partsHeaderAuthentication = auth.split(' ');
    //   if (partsHeaderAuthentication.length === 2) {
    //     const accessToken = partsHeaderAuthentication[1];
    //     TokensService.validateAccessToken(accessToken)
    //       .then((payload: any) => {
    //         response.locals.roles = payload.roles;
    //         next();
    //         return true;
    //       })
    //       .catch((response) => {
    //         const error: IError = new Error(response.message);
    //         error.status = response.status;
    //         next(error);
    //         return false;
    //       });
    //   } else {
    //     const error: IError = new Error('Invalid header authorization');
    //     error.status = 401;
    //     next(error);
    //     return false;
    //   }
    // } else {
    //   const error: IError = new Error('You are not authorized');
    //   error.status = 401;
    //   next(error);
    //   return false;
    // }
  }
}
