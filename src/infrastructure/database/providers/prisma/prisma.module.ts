import { PrismaService } from './prisma.service';
import { TemplatePrismaRepository } from './repositories/template.prisma.repository';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    PrismaService,
    TemplatePrismaRepository,
    {
      provide: 'ITemplateRepository',
      useClass: TemplatePrismaRepository,
    },
  ],
  exports: [
    PrismaService,
    'ITemplateRepository'
  ],
})
export class PrismaModule {}