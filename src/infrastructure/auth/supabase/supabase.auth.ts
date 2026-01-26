import { ICredentialAuthProvider } from '@/modules/auth/interfaces/i.credential.auth.provider';
import { SessionDto } from '@/modules/auth/dto/session.dto';
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import * as process from 'node:process';

export class SupabaseAuth implements ICredentialAuthProvider {
  private readonly client: SupabaseClient;

  constructor(params?: {
    supabaseUrl?: string;
    supabaseAnonKey?: string;
    client?: SupabaseClient; 
  }) {
    if (params?.client) {
      this.client = params.client;
      return;
    }

    // TODO : sortir le client du constructeur tbh
    const supabaseUrl = params?.supabaseUrl ?? process.env.SUPABASE_URL;
    const supabaseAnonKey = params?.supabaseAnonKey ?? process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl) throw new Error("SupabaseAuth: SUPABASE_URL is missing");
    if (!supabaseAnonKey) throw new Error("SupabaseAuth: SUPABASE_ANON_KEY is missing");

    this.client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }

  async registerWithPassword(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();

    const { data, error } = await this.client.auth.signUp({
      email,
      password: input.password,
    });

    if (error) {
      throw new Error(`SupabaseAuth.registerWithPassword failed: ${error.message}`);
    }

    const userId = data.user?.id;
    if (!userId) {
      throw new Error("SupabaseAuth.registerWithPassword failed: missing user id");
    }
    
    const session = data.session ? new SessionDto(
      data.session.access_token, 
      data.session.token_type,
      data.session.expires_in,
      data.session.expires_at, 
      data.session.refresh_token) : null;
      
    return { externalUserId: userId, email: data.user?.email ?? email, session };
  }

  async loginWithPassword(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();

    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password: input.password,
    });

    if (error) {
      throw new Error(`SupabaseAuth.loginWithPassword failed: ${error.message}`);
    }

    const userId = data.user?.id;
    if (!userId) {
      throw new Error("SupabaseAuth.loginWithPassword failed: missing user id");
    }

    const session = new SessionDto(
      data.session.access_token, 
      data.session.token_type,
      data.session.expires_in,
      data.session.expires_at, 
      data.session.refresh_token)
      
    return { externalUserId: userId, email: data.user?.email ?? email, session };
  }
}