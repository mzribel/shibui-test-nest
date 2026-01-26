import { Body, Controller, Post } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegisterCompanyDto } from "./dto/register-company.dto";

@Controller()
export class RegistrationController {
    constructor(
        private readonly registrationService: RegistrationService,
    ){}

    @Post("auth/register/company")
    registerEntreprise(@Body() dto: RegisterCompanyDto) {
        return this.registrationService.registerCompany(dto);
    }
}