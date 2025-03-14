import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';

// Lade .env falls nicht bereits geladen
dotenv.config();

// Debugging: JWT_SECRET prüfen
console.log("JwtModule nutzt JWT_SECRET:", process.env.JWT_SECRET);

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET || 'fallback_secret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    forwardRef(() => UsersModule), // Verhindert zyklische Abhängigkeiten
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
