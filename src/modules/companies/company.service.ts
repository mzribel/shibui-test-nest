import { Inject, Injectable } from "@nestjs/common";
import * as iCompanyProfileRepository from "./repositories/i.company-profile.repository";

@Injectable()
export class CompanyProfileService {
    constructor(
        @Inject('ICompanyProfileRepository')
        private readonly companyProfileRepository: iCompanyProfileRepository.ICompanyProfileRepository
    ){}

    async createProfile(userId:number, legalName:string, siret:string) {
        return this.companyProfileRepository.createProfile(userId, legalName, siret);
    }
}