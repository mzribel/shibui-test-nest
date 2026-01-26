import { Role, UserDto } from "../dto/user.dto";
export class User {
    constructor(
        public readonly id:number,
        public readonly supabaseUserId:string,
        public readonly email:string,
        public readonly role:Role
    ){}

    toDto(): UserDto {
        return {
            id:this.id,
            email:this.email,
            role:this.role
        }
    }

    static fromSupabase(supabaseUserId:string, email:string, role:Role):User {
        return new User(0, supabaseUserId, email, role)
    }
}