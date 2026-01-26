import { Inject, Injectable } from "@nestjs/common";
import { CREDENTIAL_AUTH_PROVIDER } from '@infrastructure/auth/auth.providers.module';
import * as iCredentialAuthProvider from '@/modules/auth/interfaces/i.credential.auth.provider';
import { UserService } from "../user/user.service";
import { Role } from "../user/dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject(CREDENTIAL_AUTH_PROVIDER)
    private readonly credentialAuth: iCredentialAuthProvider.ICredentialAuthProvider,
    private readonly userService: UserService) {}

  async registerEntreprise(email: string, password: string) {
    const data = await this.credentialAuth.registerWithPassword({ email, password });
    return await this.userService.createUser(
      data.externalUserId,
      data.email ?? "",
      Role.ENTREPRISE
    )
  }
    async registerEtudiant(email: string, password: string) {
    const data = await this.credentialAuth.registerWithPassword({ email, password });
    return await this.userService.createUser(
      data.externalUserId,
      data.email ?? "",
      Role.ETUDIANT
    )
  }

  async login(email: string, password: string) {
    return await this.credentialAuth.loginWithPassword({ email, password });
  }
}
