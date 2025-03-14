import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body() { email, password, role }: { email: string; password: string; role: 'PATIENT' | 'DOCTOR' },
  ) {
    if (!email || !password || !role) {
      throw new BadRequestException('Alle Felder müssen ausgefüllt sein.');
    }
    return this.usersService.createUser(email, password, role);
  }
}

