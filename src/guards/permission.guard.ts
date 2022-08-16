import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }
  
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const func = context.getHandler();
    var roles = this.reflector.get('role', func);
    const username = context.switchToHttp().getRequest().user.username;
    if (roles && !roles.includes(username)) {
      Logger.warn(`用户 ${username} 没有权限调用 ${func.name}`, this.constructor.name);
      return false;
    }
    return true;
  }
}
