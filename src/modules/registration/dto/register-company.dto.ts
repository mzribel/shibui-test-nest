export class RegisterCompanyDto {
    constructor(
        public readonly email:string,
        public readonly password:string,
        public readonly legalName:string,
        public readonly siret?:string
    ){}
}