import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { IDatabaseProvider } from '../i.database.provider';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, IDatabaseProvider
{
  private readonly logger = new Logger(PrismaService.name);
  private connected = false;

  constructor(private readonly configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL');

    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
      log: ['error', 'warn'],
      errorFormat: 'pretty',
    });

    // Log de l'environnement utilisé
    const environment = databaseUrl?.includes('supabase') ? 'Supabase' : 'PostgreSQL local';
    this.logger.log(`Configuration pour: ${environment}`);
  }

  getClient() {
    return this;
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  async connect(): Promise<void> {
    try {
      await this.$connect();
      this.connected = true;

      // Détection automatique de l'environnement
      const dbUrl = this.configService.get<string>('DATABASE_URL');
      const env = dbUrl?.includes('supabase') ? 'Supabase' : 'PostgreSQL local';

      this.logger.log(`✅ Connexion établie avec succès à ${env}`);
    } catch (error) {
      this.connected = false;
      this.logger.error('❌ Erreur de connexion à la base de données', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.$disconnect();
      this.connected = false;
      this.logger.log('Déconnexion de la base de données');
    } catch (error) {
      this.logger.error('Erreur lors de la déconnexion', error);
      throw error;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('Health check échoué', error);
      return false;
    }
  }
}