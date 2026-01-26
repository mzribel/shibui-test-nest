import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { PrismaTemplateRepository } from './repositories/template.prisma.repository';

@Module({
  controllers: [TemplateController],
  providers: [
    TemplateService,
    PrismaTemplateRepository,
    { provide: 'ITemplateRepository', useExisting: PrismaTemplateRepository },
  ],
  exports: [TemplateService],
})
export class TemplateModule {}