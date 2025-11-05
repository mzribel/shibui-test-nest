import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { IDatabaseProvider } from '../../i-database.provider';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, IDatabaseProvider
{
  private readonly logger = new Logger(PrismaService.name);
  private connected = false;

  constructor() {
    super({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
    });
  }

  getClient() {
    throw new Error('Method not implemented.');
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
      this.logger.log('Connexion à PostgreSQL établie avec succès');
    } catch (error) {
      this.connected = false;
      this.logger.error('Erreur de connexion à PostgreSQL', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.$disconnect();
      this.connected = false;
      this.logger.log('Déconnexion de PostgreSQL');
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
