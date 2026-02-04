import { IS_PUBLIC_KEY } from "@/common/decorators/roles.decorator";
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  Optional,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SupabaseClient, User, createClient } from "@supabase/supabase-js";
import { Request } from "express";

type RequestWithUser = Request & { user?: User };

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(SupabaseAuthGuard.name);
  private readonly supabaseClient: SupabaseClient;

  constructor(
    private readonly reflector: Reflector,
    @Optional() @Inject("SUPABASE_CLIENT") client?: SupabaseClient
  ) {
    this.supabaseClient = client || this.initializeSupabaseClient();
  }

  private initializeSupabaseClient(): SupabaseClient {
    this.logger.debug("Supabase auth guard initializing new Supabase client.");
    if (!process.env.SUPABASE_URL) {
      throw new Error("SUPABASE_URL is not set.");
    }
    if (!process.env.SUPABASE_ANON_KEY) {
      throw new Error("SUPABASE_ANON_KEY is not set.");
    }
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = await this.authenticateRequest(request);
    request.user = user;
    return true;
  }

  private async authenticateRequest(request: Request): Promise<User> {
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException("No token provided");

    const user = await this.getUserFromJWT(token);
    if (!user) throw new UnauthorizedException("Invalid token");

    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const auth = request.headers.authorization;
    if (!auth) return undefined;

    const [type, token] = auth.split(" ");
    if (type !== "Bearer") return undefined;
    if (!token || token === "undefined") return undefined; // si tu reçois littéralement "undefined"
    return token;
  }

  private async getUserFromJWT(token: string): Promise<User | undefined> {
    const { data, error } = await this.supabaseClient.auth.getUser(token);
    if (error) return undefined;
    return data.user ?? undefined;
  }
}
