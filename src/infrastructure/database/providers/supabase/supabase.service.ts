import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseProvider } from '../../i-database.provider';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit, IDatabaseProvider {
  private readonly logger = new Logger(SupabaseService.name);
  private supabase: SupabaseClient;
  private connected = false;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async connect(): Promise<void> {
    try {
      const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
      const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('SUPABASE_URL et SUPABASE_ANON_KEY doivent être définis dans .env');
      }

      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.connected = true;
      this.logger.log('Connexion à Supabase établie avec succès');
    } catch (error) {
      this.connected = false;
      this.logger.error('Erreur de connexion à Supabase', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    // Supabase client n'a pas de méthode disconnect explicite
    this.connected = false;
    this.logger.log('Déconnexion de Supabase');
  }

  isConnected(): boolean {
    return this.connected;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const { error } = await this.supabase.from('templates').select('id').limit(1);
      return !error;
    } catch (error) {
      this.logger.error('Health check Supabase échoué', error);
      return false;
    }
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized');
    }
    return this.supabase;
  }
}