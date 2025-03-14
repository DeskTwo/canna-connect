import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express'; // 🟢 NEU: Response-Objekt importieren
import { UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";  // Falls `LoginDto` noch fehlt


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
async login(
  @Body() loginDto: LoginDto,
  @Res({ passthrough: true }) response: Response
) {
  const user = await this.authService.validateUser(loginDto.email, loginDto.password);
  if (!user) throw new UnauthorizedException();

  await this.authService.login(user, response);

  return { message: "Login erfolgreich" };  // ❗ KEIN Token mehr zurückgeben
}

  

@Post('logout')
async logout(@Res({ passthrough: true }) response: Response) {
  response.clearCookie('jwt'); // 🟢 JWT-Cookie im Browser löschen
  return { message: 'Logout erfolgreich' };
}

}
