import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { PrismaCompanyProfileRepository } from "./repositories/prisma.company-profile.repository";

@Injectable()
export class CompanyProfileService {
    constructor(
        @Inject('ICompanyProfileRepository')
        private readonly companyProfileRepository: PrismaCompanyProfileRepository
    ){}

    async createProfile(userId:number, legalName:string, siret:string) {
        if (siret != "") {
            const existsBySiret = await this.companyProfileRepository.existsBySiret(siret);
            if (existsBySiret) throw new ConflictException("A company with this SIRET has already been registered")
        }

        return this.companyProfileRepository.createProfile(userId, legalName, siret);
    }
}