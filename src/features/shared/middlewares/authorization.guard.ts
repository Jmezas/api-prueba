import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IError } from '../helpers/errors.helper';

@Injectable()
export class Authorization implements CanActivate {
  constructor(private readonly rolesAllowed: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Authorization');
    const next = context.switchToHttp().getNext();
    //  const roles = response.locals.roles;

    const roles: String[] = this.rolesAllowed.get<string[]>(
      'roles',
      context.getHandler(),
    );
    console.log('roles', roles);
    if (roles.some((role) => roles.includes(role))) {
      next();
      return true;
    } else {
      const error: IError = new Error('You are not authorized');
      error.status = 401;
      next(error);
      return false;
    }
  }
}
