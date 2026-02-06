import { ImATeapotException, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { CompanyProfileService } from "../companies/company.service";
import { RegisterCompanyDto } from "./dto/register-company.dto";
import { Role } from "@prisma/client";
import { RegisterStudentDto } from "./dto/register-student.dto";
import { PrismaTransactionRunner } from "@/infrastructure/database/prisma/prisma.transaction-runner";

@Injectable()
export class AccountService {
    constructor(
        private readonly tx: PrismaTransactionRunner,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly companyProfileService: CompanyProfileService
    ){}

    async registerCompany(dto:RegisterCompanyDto) {
        const auth = await this.authService.register(dto.email, dto.password);
        try {
            return await this.tx.run(async() => {
                const user = await this.userService.createUser(auth.externalUserId,dto.email ??"", Role.ENTREPRISE)
                await this.companyProfileService.createProfile(user.id, dto.legalName, dto.siret ?? "")
                return user;
            });
        } catch(e) {
            this.authService.deleteUser(auth.externalUserId)
            throw e;
        }
    }

    async registerStudent(dto:RegisterStudentDto){
        
    }
}