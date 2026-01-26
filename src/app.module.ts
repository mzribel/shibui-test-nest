import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from '@modules/template/template.module';
import { AuthModule } from '@modules/auth/auth.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { UserModule } from './modules/user/user.module';
import { SupabaseAuthGuard } from './modules/auth/guards/supabase-auth.guard';
import { RegistrationModule } from './modules/registration/registration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    TemplateModule,
    UserModule,
    RegistrationModule
  ],
  // providers: [
  //   { provide: APP_GUARD, useClass: SupabaseAuthGuard },
  //   { provide: APP_GUARD, useClass: RolesGuard }
  // ]
})
export class AppModule {}
