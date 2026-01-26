import { Injectable } from "@nestjs/common";
import { IUserRepository } from "./i.user.repository";
import { User } from "../models/user";
import { PrismaService } from "@/infrastructure/database/prisma/prisma.service";
import { Role } from "../dto/user.dto";

@Injectable() 
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

    findById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async findBySupabaseId(supabaseUserId: string): Promise<User|null> {
        const user = await this.prisma.user.findUnique({
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
        const user = await this.prisma.user.create({
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