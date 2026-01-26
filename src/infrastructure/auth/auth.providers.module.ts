import { Module, Provider } from "@nestjs/common";
import { SupabaseAuth } from "./supabase/supabase.auth";

export const CREDENTIAL_AUTH_PROVIDER = Symbol("CREDENTIAL_AUTH_PROVIDER");

const credentialAuthProvider: Provider = {
  provide: CREDENTIAL_AUTH_PROVIDER,
  useClass: SupabaseAuth,
};

@Module({
  providers: [credentialAuthProvider],
  exports: [CREDENTIAL_AUTH_PROVIDER],
})
export class AuthProvidersModule {}