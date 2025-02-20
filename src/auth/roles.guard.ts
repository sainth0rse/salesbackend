import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { ROLES_KEY } from './roles.decorator';
import { Request } from 'express';

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

/**
 * Расширяем Request из express,
 * чтобы у него было поле user: JwtPayload | undefined
 */
interface ExpressRequest extends Request {
  user?: JwtPayload;
}

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Сначала даём сработать JWT-Guard’у
    const activate = super.canActivate(context) as boolean | Promise<boolean>;
    if (!activate) {
      return false;
    }

    // Достаём роли, указанные через декоратор @Roles(...)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      // Если не указаны роли — пускаем всех авторизованных
      return true;
    }

    // Типизируем request
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const user = request.user; // user: JwtPayload | undefined

    if (!user) {
      return false;
    }

    // Проверяем, есть ли у пользователя роль из requiredRoles
    return requiredRoles.some((role) => user.role === role);
  }
}
