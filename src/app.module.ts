import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from '@modules/template/template.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(),
    DatabaseModule.forFeature(),
    AuthModule,
    TemplateModule,
  ]
})
export class AppModule {}
