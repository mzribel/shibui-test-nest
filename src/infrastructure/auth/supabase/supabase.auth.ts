import { ICredentialAuthProvider } from '@infrastructure/auth/i.credential.auth.provider';
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { IOAuthProvider } from '@infrastructure/auth/i.oauth.provider';
import * as process from 'node:process';
import crypto from "crypto";
import { BadRequestException } from '@nestjs/common';

const ALLOWED_PROVIDERS = ["google", "github", "linkedin"] as const;
type OAuthProvider = (typeof ALLOWED_PROVIDERS)[number];

function parseProvider(raw: string): OAuthProvider {
  if ((ALLOWED_PROVIDERS as readonly string[]).includes(raw)) return raw as OAuthProvider;
  throw new BadRequestException("Unsupported OAuth provider");
}

export class SupabaseAuth implements ICredentialAuthProvider, IOAuthProvider {
  private readonly client: SupabaseClient;

  constructor(params?: {
    supabaseUrl?: string;
    supabaseAnonKey?: string;
    client?: SupabaseClient; // optional injection for tests
  }) {
    if (params?.client) {
      this.client = params.client;
      return;
    }

    const supabaseUrl = params?.supabaseUrl ?? process.env.SUPABASE_URL;
    const supabaseAnonKey = params?.supabaseAnonKey ?? process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl) throw new Error("SupabaseAuth: SUPABASE_URL is missing");
    if (!supabaseAnonKey) throw new Error("SupabaseAuth: SUPABASE_ANON_KEY is missing");

    this.client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Backend: we do not want any persistent session behavior
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
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      }
    });

    if (error) {
      // You can map Supabase errors to your domain errors here if you want.
      // For now we keep it generic but explicit.
      throw new Error(`SupabaseAuth.registerWithPassword failed: ${error.message}`);
    }

    const userId = data.user?.id;
    if (!userId) {
      // Can happen if provider returns an unexpected shape
      throw new Error("SupabaseAuth.registerWithPassword failed: missing user id");
    }

    return { externalUserId: userId, email: data.user?.email ?? email };
  }

  async loginWithPassword(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();

    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password: input.password,
    });

    if (error) {
      // Typical: "Invalid login credentials"
      throw new Error(`SupabaseAuth.loginWithPassword failed: ${error.message}`);
    }

    const userId = data.user?.id;
    if (!userId) {
      throw new Error("SupabaseAuth.loginWithPassword failed: missing user id");
    }

    return { externalUserId: userId, email: data.user?.email ?? email };
  }

  async getAuthorizationUrl(input: { provider: OAuthProvider; redirectUri: string }) {
    parseProvider(input.provider);

    const { data, error } = await this.client.auth.signInWithOAuth({
      provider: input.provider,
      options: {
        redirectTo: input.redirectUri,
        skipBrowserRedirect: true,
      },
    });

    if (error || !data?.url) {
      throw new Error(`SupabaseOAuthProvider.getAuthorizationUrl failed: ${error?.message ?? "no url"}`);
    }

    return { url: data.url };
  }

  async exchangeCode(input: { provider: OAuthProvider; code: string; redirectUri: string }) {
    parseProvider(input.provider);

    // Supabase SDK échange le code contre une session côté serveur
    // (redirectUri n'est pas toujours requis par le SDK, mais on le garde dans l'interface pour être standard)
    const { data, error } = await this.client.auth.exchangeCodeForSession(input.code);

    if (error || !data?.user?.id) {
      throw new Error(`SupabaseOAuthProvider.exchangeCode failed: ${error?.message ?? "no user"}`);
    }

    return {
      externalUserId: data.user.id,
      email: data.user.email ?? undefined,
    };
  }
}