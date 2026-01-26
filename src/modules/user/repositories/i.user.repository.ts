import { User } from "../models/user";

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findBySupabaseId(id:string): Promise<User|null>;
  create(user:User):Promise<User>;
}