import { User } from "../models/User";

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    createUser(userData: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
    updateUser(userId: string, userData: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}