import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
        if (request && request.cookies) {
          return request.cookies['jwt']; // 🟢 Holt das JWT aus den Cookies
        }
        return null;
      }]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default_secret',
    });
  }

  async validate(payload: any) {
    return { email: payload.email, sub: payload.sub, role: payload.role };
  }
}
