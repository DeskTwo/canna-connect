import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { Roles } from './auth/decorators/roles.decorator'; 
import { RolesGuard } from './auth/guards/roles.guard';    
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.role as 'PATIENT' | 'DOCTOR' | 'ADMIN'
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
