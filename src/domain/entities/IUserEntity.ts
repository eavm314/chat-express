export interface IUserEntity {
    id?: string;
    username: string;
    email:string;
    passwordHash: string;
    createdAt: Date
}