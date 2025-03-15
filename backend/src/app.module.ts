import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service'; // ✅ PrismaService importieren
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'; // ✅ Globaler Auth Guard
import { RolesGuard } from './auth/guards/roles.guard'; // ✅ Globaler Rollen-Guard

@Module({
  imports: [UsersModule, AuthModule],
  providers: [
    PrismaService, // ✅ PrismaService hier registrieren
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // ✅ Setzt den JWT AuthGuard als globalen Guard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // ✅ Setzt den Rollen-Guard als globalen Guard
    },
  ],
  exports: [PrismaService], // Falls andere Module darauf zugreifen müssen
})
export class AppModule {}
