import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() { email, password, role }: { email: string; password: string; role: 'PATIENT' | 'DOCTOR' | 'ADMIN' },
  ) {
    return this.usersService.createUser(email, password, role);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard) // Nur eingeloggte Benutzer
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('patients')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT') // Nur für Patienten
  getPatients() {
    return { message: 'Patient-only route' };
  }

  @Get('doctors')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR') // Nur für Ärzte
  getDoctors() {
    return { message: 'Doctor-only route' };
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN') // Nur für Admins
  getAdmin() {
    return { message: 'Admin-only route' };
  }
}
