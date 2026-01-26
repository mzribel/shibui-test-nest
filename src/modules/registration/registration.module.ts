import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { RegistrationController } from "./registration.controller";
import { RegistrationService } from "./registration.service";
import { CompanyModule } from "../companies/company.controller";

@Module({
    imports: [AuthModule, UserModule, CompanyModule],
    controllers: [RegistrationController],
    providers:[RegistrationService],
    exports:[RegistrationService]
})
export class RegistrationModule {}