import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaUserRepository } from "./repositories/prisma.user.repository";

@Module({
    providers: [
        UserService,
        PrismaUserRepository,
        { provide: 'IUserRepository', useExisting: PrismaUserRepository}
    ],
    exports: [UserService, "IUserRepository"]
})
export class UserModule {}