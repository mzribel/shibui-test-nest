import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { GlobalRegisterDto } from "./global-register.dto";

export class RegisterCompanyDto extends GlobalRegisterDto {

    @IsNotEmpty()
    legalName!:string;

    @IsOptional()
    @Matches(/^\d{14}$/, { message: "SIRET must contain 14 numbers" })
    siret?:string;
}