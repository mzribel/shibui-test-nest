import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum DatabaseProvider {
  PRISMA = 'PRISMA',
  SUPABASE = 'SUPABASE',
}

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  getProvider(): DatabaseProvider {
    const provider = this.configService.get<string>('DATABASE_PROVIDER', 'PRISMA');
    return provider.toUpperCase() as DatabaseProvider;
  }

  isPrisma(): boolean {
    return this.getProvider() === DatabaseProvider.PRISMA;
  }

  isSupabase(): boolean {
    return this.getProvider() === DatabaseProvider.SUPABASE;
  }
}