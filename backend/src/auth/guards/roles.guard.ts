import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ROLES_KEY } from '../decorators/roles.decorator'; // ✅ Korrigierter Import
import { Request } from 'express';
import { Reflector } from '@nestjs/core'; // ✅ Import von Reflector korrigiert!

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // Kein Rollen-Check notwendig
    }

    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request as unknown as { user?: { role?: string } };

    if (!user || !user.role) {
      throw new UnauthorizedException('User not authenticated or role missing');
    }

    return requiredRoles.includes(user.role);
  }
}
