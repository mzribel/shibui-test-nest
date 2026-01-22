import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post, Query, Redirect, Res,
} from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import crypto from "crypto";
import { OAUTH_PROVIDERS } from '@infrastructure/auth/i.oauth.provider';

const ALLOWED_PROVIDERS = ["google", "github", "linkedin"] as const;
type OAuthProvider = (typeof ALLOWED_PROVIDERS)[number];

function parseProvider(raw: string): OAuthProvider {
  if ((ALLOWED_PROVIDERS as readonly string[]).includes(raw)) return raw as OAuthProvider;
  throw new BadRequestException("Unsupported OAuth provider");
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: { email: string; password: string }) {
    return this.authService.register(dto.email, dto.password);
  }

  @Get(":provider")
  @Redirect()
  async start(@Param("provider") rawProvider: string, @Res() res: Response) {
    const provider = parseProvider(rawProvider);
    const state = crypto.randomUUID();

    // TODO: stocker state côté serveur (cookie HttpOnly signé ou cache)
    const redirectUri = `${process.env.API_BASE_URL}/auth/${provider}/callback`;

    const { url } = await this.authService.start('google');
    return { url };
  }

  @Get(":provider/callback")
  async callback(
    @Param("provider") rawProvider: string,
    @Query("code") code: string,
    @Res() res: Response,
  ) {
    const provider = parseProvider(rawProvider);
    if (!code) throw new BadRequestException("Missing code");

    // TODO: vérifier state
    const identity = await this.authService.callback('google', code)
    // TODO: créer/récupérer user interne, charger rôles, émettre token API (cookie), redirect front
    return identity;
  }
}
