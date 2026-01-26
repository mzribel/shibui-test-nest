import { Module } from '@nestjs/common';
import { AuthProvidersModule } from '@infrastructure/auth/auth.providers.module';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { UserModule } from '../user/user.module';
import { RolesGuard } from '@/common/guards/roles.guard';
import { SupabaseAuthGuard } from '@/common/guards/supabase-auth.guard';

@Module({
  imports: [AuthProvidersModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    RolesGuard,
    SupabaseAuthGuard
  ],
  exports: [
    AuthService, 
    RolesGuard, 
    SupabaseAuthGuard
  ]
})
export class AuthModule {}