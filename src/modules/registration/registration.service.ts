import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { CompanyProfileService } from "../companies/company.service";
import { RegisterCompanyDto } from "./dto/register-company.dto";
import { Role } from "@prisma/client";

@Injectable()
export class RegistrationService {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly companyProfileService: CompanyProfileService
    ){}

    async registerCompany(dto:RegisterCompanyDto) {
        const data = await this.authService.register(dto.email, dto.password);
        const user = await this.userService.createUser(data.externalUserId,data.email ??"", Role.ENTREPRISE)
        const profile = this.companyProfileService.createProfile(user.id, dto.legalName, dto.siret ?? "")
    }
}