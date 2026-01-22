import { Module } from '@nestjs/common';
import { AuthProvidersModule } from '@infrastructure/auth/auth.providers.module';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';

@Module({
  imports: [AuthProvidersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}