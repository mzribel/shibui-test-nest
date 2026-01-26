import { Injectable, Inject } from "@nestjs/common";
import * as iUserRepository from "./repositories/i.user.repository";
import { Role, UserDto } from "./dto/user.dto";
import { User } from "./models/user";

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: iUserRepository.IUserRepository
    ){}

    async createUser(supabaseUserId:string, email:string, role:Role): Promise<UserDto> {
        const userInput = User.fromSupabase(supabaseUserId, email, role);
        const userModel = await this.userRepository.create(userInput);
        return userModel.toDto();
    }

    async getBySupabaseUserId(supabaseUserId:string): Promise<User|null> {
        return this.userRepository.findBySupabaseId(supabaseUserId)
    }

}