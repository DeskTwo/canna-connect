import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core'; // 👈 Hier sicherstellen, dass Reflector korrekt importiert ist

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Prüfen, ob die Route als "public" markiert ist
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true; // Authentifizierung überspringen
    }

    // Token aus Cookies extrahieren
    const request = context.switchToHttp().getRequest();
    if (!request.cookies || !request.cookies['jwt']) {
      throw new UnauthorizedException('Kein Token vorhanden');
    }

    return super.canActivate(context);
  }
}
