import { Injectable, Inject } from "@nestjs/common";
import { Role, UserDto } from "./dto/user.dto";
import { User } from "./models/user";
import { PrismaUserRepository } from "./repositories/prisma.user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: PrismaUserRepository
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