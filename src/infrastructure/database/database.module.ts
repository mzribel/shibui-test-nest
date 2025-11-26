import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
      ],
    };
  }

  static forFeature(): DynamicModule {
    // Plus besoin de switch, toujours Prisma
    return {
      module: DatabaseModule,
      imports: [PrismaModule],
      exports: [PrismaModule],
    };
  }
}