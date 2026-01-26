export class CompanyProfile {
    constructor(
        public readonly userId:number,
        public readonly legalName:string,
        public readonly siret:string,
        public readonly isVerified:boolean=false
    ){}
}