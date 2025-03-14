import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';  // ✅ JWT-Modul importieren
import { AuthModule } from '../auth/auth.module';  // ✅ Auth-Module importieren

@Module({
  imports: [JwtModule.register({}), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}

