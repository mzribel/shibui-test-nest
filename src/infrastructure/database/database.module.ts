import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './providers/prisma/prisma.module';
import { SupabaseModule } from './providers/supabase/supabase.module';

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
    const provider = process.env.DATABASE_PROVIDER || 'PRISMA';
    const moduleToImport = provider.toUpperCase() === 'SUPABASE' ? SupabaseModule : PrismaModule;

    return {
      module: DatabaseModule,
      imports: [moduleToImport],
      exports: [moduleToImport],
    };
  }
}