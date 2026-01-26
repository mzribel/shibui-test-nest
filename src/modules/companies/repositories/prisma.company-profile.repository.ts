import { PrismaService } from "@/infrastructure/database/prisma/prisma.service";
import { CompanyProfile } from "../models/company-profile";
import { ICompanyProfileRepository } from "./i.company-profile.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaCompanyProfileRepository implements ICompanyProfileRepository {
    constructor(private readonly prisma: PrismaService) {}
    
    async createProfile(userId: number, legalName: string, siret?: string) {
        const data = await this.prisma.companyProfile.create({
            data: {
                userId,
                legalName,
                siret
            }
        })

        return new CompanyProfile(
            data.userId, data.legalName, data.siret ?? "", data.isVerified
        )
    }
    findById(id: number): Promise<CompanyProfile | null> {
        throw new Error("Method not implemented.");
    }
}