/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './../models/role.model';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { PayloadToken } from '../models/model.token';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const payload = jwtDecode(
      request.headers.authorization.replace('Bearer ', ''),
    ) as PayloadToken;
    const isAuth = roles.some((role) => role === payload.role);
    if (!isAuth) {
      throw new UnauthorizedException(
        'You don´t have privileges to perform this action.',
      );
    }
    return true;
  }
}
