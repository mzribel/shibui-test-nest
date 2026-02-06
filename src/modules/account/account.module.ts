import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { CompanyModule } from "../companies/company.controller";

@Module({
    imports: [AuthModule, UserModule, CompanyModule],
    controllers: [AccountController],
    providers:[AccountService],
    exports:[AccountService]
})
export class AccountModule {}