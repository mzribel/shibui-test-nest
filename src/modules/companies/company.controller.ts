import { Module } from "@nestjs/common";
import { CompanyProfileService } from "./company.service";
import { PrismaCompanyProfileRepository } from "./repositories/prisma.company-profile.repository";

@Module({
    providers:[
        CompanyProfileService,
        PrismaCompanyProfileRepository,
        { provide: 'ICompanyProfileRepository', useExisting: PrismaCompanyProfileRepository}
    ],
    exports: [CompanyProfileService]
})
export class CompanyModule {}