import { Inject, Injectable } from "@nestjs/common";
import { CREDENTIAL_AUTH_PROVIDER } from '@infrastructure/auth/auth.providers.module';
import * as iCredentialAuthProvider from '@/modules/auth/interfaces/i.credential.auth.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CREDENTIAL_AUTH_PROVIDER)
    private readonly credentialAuth: iCredentialAuthProvider.ICredentialAuthProvider) {}

    async register(email:string, password:string) {
        return this.credentialAuth.registerWithPassword({ email, password });
    }

    async login(email: string, password: string) {
      return await this.credentialAuth.loginWithPassword({ email, password });
    }
}
