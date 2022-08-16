import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PermissionGuard } from './permission.guard';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {

  constructor(private reflector: Reflector) {
    super();
  }

  private permissionGuard = new PermissionGuard(this.reflector);

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    return await super.canActivate(context) as boolean && this.permissionGuard.canActivate(context);
  }
}
