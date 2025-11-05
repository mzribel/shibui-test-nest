import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from './modules/template/template.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot(),
    DatabaseModule.forFeature(),
    TemplateModule,
  ]
})
export class AppModule {}
