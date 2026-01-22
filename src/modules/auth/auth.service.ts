import { Inject, Injectable } from "@nestjs/common";
import { CREDENTIAL_AUTH_PROVIDER } from '@infrastructure/auth/auth.providers.module';
import * as iCredentialAuthProvider from '@infrastructure/auth/i.credential.auth.provider';
import * as iOAuthProvider from '@infrastructure/auth/i.oauth.provider';
import { IOAuthProvider, OAuthProvider } from '@infrastructure/auth/i.oauth.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CREDENTIAL_AUTH_PROVIDER)
    private readonly credentialAuth: iCredentialAuthProvider.ICredentialAuthProvider,
    @Inject(CREDENTIAL_AUTH_PROVIDER)
    private readonly oAuth: iOAuthProvider.IOAuthProvider,
  ) {}

  register(email: string, password: string) {
    return this.credentialAuth.registerWithPassword({ email, password });
  }

  login(email: string, password: string) {
    return this.credentialAuth.loginWithPassword({ email, password });
  }

  async start(provider: OAuthProvider) {
    const redirectUri = `${process.env.API_BASE_URL}/auth/${provider}/callback`;

    // TODO: stocker state côté serveur (lié à la session/cookie)
    const { url } = await this.oAuth.getAuthorizationUrl({
      provider,
      redirectUri,
    });

    return { url }; // en pratique tu ne renvoies pas state au client si tu le mets en cookie
  }

  async callback(provider: OAuthProvider, code: string) {
    const redirectUri = `${process.env.API_BASE_URL}/auth/${provider}/callback`;

    // TODO: vérifier state côté serveur
    const identity = await this.oAuth.exchangeCode({ provider, code, redirectUri });

    // TODO: lier/créer user interne (via auth_identities), charger rôles en DB
    // TODO: émettre ton token API (JWT) / cookie
    return identity;
  }
}
