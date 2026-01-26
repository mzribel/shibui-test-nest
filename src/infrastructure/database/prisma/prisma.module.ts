import { PrismaService } from './prisma.service';
import { Global, Module } from '@nestjs/common';

@Global() // Pour que tous les modules y aient accès par défaut
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
