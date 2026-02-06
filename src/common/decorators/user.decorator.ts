import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import type { User } from "@/modules/user/models/user";

type RequestWithUser = Request & {user?:User};

export const CurrentUser = createParamDecorator(
    (_:unknown, ctx:ExecutionContext): User => {
        const req = ctx.switchToHttp().getRequest<RequestWithUser>();
        if (!req.user) throw new UnauthorizedException();
        return req.user;
    }
)