// auth/auth.module.ts
import { Module, Provider } from "@nestjs/common";
import { SupabaseAuth } from "./supabase/supabase.auth";
import { ICredentialAuthProvider } from "./i.credential.auth.provider";

export const CREDENTIAL_AUTH_PROVIDER = Symbol("CREDENTIAL_AUTH_PROVIDER");
export const OAUTH_PROVIDER = Symbol("OAUTH_PROVIDER");

const credentialAuthProvider: Provider = {
  provide: CREDENTIAL_AUTH_PROVIDER,
  useClass: SupabaseAuth,
};
const oAuthProvider: Provider = {
  provide: OAUTH_PROVIDER,
  useClass: SupabaseAuth,
};

@Module({
  providers: [
    credentialAuthProvider, oAuthProvider],
  exports: [CREDENTIAL_AUTH_PROVIDER, OAUTH_PROVIDER],
})
export class AuthProvidersModule {}