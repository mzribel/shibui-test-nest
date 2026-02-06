import { CompanyProfile } from "../models/company-profile";
import { Injectable } from "@nestjs/common";
import { PrismaDbContext } from "@/infrastructure/database/prisma/prisma-db-context";

@Injectable()
export class PrismaCompanyProfileRepository {
    constructor(private readonly ctx:PrismaDbContext) {}
    
    async createProfile(userId: number, legalName: string, siret?: string) {
        const data = await this.ctx.db.companyProfile.create({
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

    async existsBySiret(siret: string): Promise<boolean> {
        const user = await this.ctx.db.companyProfile.findFirst({
            where: { siret }
        });

        return user !== null;
    }
}