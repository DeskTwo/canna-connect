import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';  // ✅ KORREKT! Reflector kommt aus `@nestjs/core`
import { ROLES_KEY } from './decorators/roles.decorator'; // ✅ Sicherstellen, dass der Pfad stimmt
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // Falls keine Rolle erforderlich ist, Zugriff erlauben
    }

    const request = context.switchToHttp().getRequest();
    const user = (request as any).user as { role?: string } | undefined;

    if (!user || !user.role) {
      throw new UnauthorizedException('Kein Benutzer gefunden oder keine Rolle zugewiesen.');
    }

    return requiredRoles.includes(user.role);
  }
}
