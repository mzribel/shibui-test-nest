import { CompanyProfile } from "../models/company-profile";

export interface ICompanyProfileRepository {
    findById(id:number):Promise<CompanyProfile|null>;
    createProfile(userId:number, legalName:string, siret?:string)
}