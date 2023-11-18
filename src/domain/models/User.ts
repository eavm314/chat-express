import { IUserEntity } from '../entities/IUserEntity';
import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string;
    username: string;
    passwordHash: string;
    email: string;
    createdAt: Date;
    token: string | null;


    constructor(userEntity: IUserEntity) {
        this.id = userEntity.id || uuidv4();
        this.username = userEntity.username;
        this.email = userEntity.email;
        this.passwordHash = userEntity.passwordHash;
        this.createdAt = userEntity.createdAt || new Date();
    }
}