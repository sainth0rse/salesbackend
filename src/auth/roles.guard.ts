import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { ROLES_KEY } from './roles.decorator';

// Определяем интерфейс для пользователя
interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const activate = super.canActivate(context) as boolean | Promise<boolean>;
    if (!activate) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload | undefined;

    if (!user) {
      return false;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
