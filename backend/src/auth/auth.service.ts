import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express'; // 🟢 NEU: Response-Objekt importieren


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Benutzer nicht gefunden');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Falsches Passwort');

    return { id: user.id, email: user.email, role: user.role };
  }

  async login(user: any, res: Response) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
  
    res.cookie("jwt", token, {
      httpOnly: true,   // ❗ Kein Zugriff über JavaScript im Browser
      secure: false,    // ❗ Für lokale Tests, in Produktion: true
      sameSite: "lax",  // ❗ Notwendig für Cross-Origin-Requests
    });
  
    return { message: "Login erfolgreich" }; // ❗ KEIN Token mehr zurückgeben
  }

  async logout(res: Response) { // 🟢 Logout-Route, um den Cookie zu löschen
    res.clearCookie('auth_token');
    return { message: 'Logout erfolgreich' };
  }
}
