import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';

import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [
    DatabaseModule, // Fournit le repository configuré (Supabase ou Prisma)
  ],
  controllers: [TemplateController],
  providers: [
    TemplateService,
  ],
  exports: [TemplateService],
})
export class TemplateModule {}