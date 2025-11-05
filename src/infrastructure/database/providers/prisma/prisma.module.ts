import { PrismaService } from './prisma.service';
import { PrismaTemplateRepository } from './repositories/prisma-template.repository';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    PrismaService,
    PrismaTemplateRepository,
    {
      provide: 'ITemplateRepository',
      useClass: PrismaTemplateRepository,
    },
  ],
  exports: [
    PrismaService,
    'ITemplateRepository'
  ],
})
export class PrismaModule {}