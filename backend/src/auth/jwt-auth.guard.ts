import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    if (!request.cookies || !request.cookies['jwt']) {
      throw new UnauthorizedException('No token provided'); // 🔴 Verhindert den 401-Fehler
    }

    return super.canActivate(context);
  }
}
