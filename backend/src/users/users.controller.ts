import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator'; // ✅ Public-Decorator importieren

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @Public() // ✅ Registrierung ohne Authentifizierung erlauben
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(
      createUserDto.email, 
      createUserDto.password, 
      createUserDto.role
    );
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile() {
    return { message: 'User Profile' };
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  getAdminArea() {
    return { message: 'Admin Bereich' };
  }

  @Get('doctors')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('DOCTOR')
  getDoctorsOnly() {
    return { message: 'Doctors Bereich' };
  }
}
