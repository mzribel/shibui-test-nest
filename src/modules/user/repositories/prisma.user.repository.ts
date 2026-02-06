import { Injectable } from "@nestjs/common";
import { User } from "../models/user";
import { Role } from "../dto/user.dto";
import { PrismaDbContext } from "@/infrastructure/database/prisma/prisma-db-context";

@Injectable() 
export class PrismaUserRepository {
  constructor(private readonly ctx:PrismaDbContext) {}

    findById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async findBySupabaseId(supabaseUserId: string): Promise<User|null> {
        const user = await this.ctx.db.user.findUnique({
            where: {supabaseUserId}
        })

        if (!user) return null;

        return new User(
            user.id,
            user.supabaseUserId,
            user.email,
            user.role
        )
    }
    
    async create(userData: User): Promise<User> {
        const user = await this.ctx.db.user.create({
            data: {
                supabaseUserId: userData.supabaseUserId, 
                email: userData.email,
                role: userData.role
            }
        });

        return new User(
            user.id, 
            user.supabaseUserId,
            user.email, 
            Role.ETUDIANT, 
        )
    }
    
}