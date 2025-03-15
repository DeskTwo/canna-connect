import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // 🔹 JWT Guard importieren
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard'; // 🔹 RBAC Guard importieren

import * as dotenv from 'dotenv';

// Lade .env falls nicht bereits geladen
dotenv.config();

// Debugging: JWT_SECRET prüfen
if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR: JWT_SECRET ist nicht gesetzt! Überprüfe deine .env Datei.");
} else {
  console.log("✅ JWT_SECRET geladen:", process.env.JWT_SECRET);
}

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
  providers: [
    AuthService, 
    PrismaService, 
    JwtStrategy,
    {
      provide: APP_GUARD, 
      useClass: JwtAuthGuard, // 🔹 JWT Guard global aktivieren
    },
    {
      provide: APP_GUARD, 
      useClass: RolesGuard, // 🔹 RBAC Guard global aktivieren
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
