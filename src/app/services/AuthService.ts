import bcrypt from "bcrypt";

import { IUserEntity } from "../../domain/entities/IUserEntity";
import { User } from "../../domain/models/User";
import logger from "../../infrastructure/logger/logger";
import { LoginDto } from "../dtos/LoginDto";
import { UserResponseDto } from "../dtos/UserResponseDto";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { IEncrypt } from "../utils/IEncrypt";
import { ICacheService } from "../../domain/interfaces/ICacheService";

export class AuthService {

    constructor(
        private userRepository: IUserRepository, 
        private encrypt: IEncrypt,
        private cacheService: ICacheService
    ) { }

    async getCache() {
        const sol = await this.cacheService.get('USER:627c8259-e1d2-4a0a-9d8a-2528b9a395f7');
        console.log(sol);
    }

    async login(loginDTO: LoginDto): Promise<UserResponseDto> {
        this.getCache();

        const userEntity: Partial<IUserEntity> = {
            email: loginDTO.email,
            passwordHash: loginDTO.password
        };
        const user: User = await this.userRepository.findByEmail(userEntity.email);
        if (!user) {
            logger.error(`El usuario con el email: ${userEntity.email} no existe`);
            throw Error('El email o el password son incorrectos');
        }

        this.cacheService.set(`USER:${user.id}`, JSON.stringify(user));
        // TODO: llevarlo al utils 

        const isPasswordCorrect = await bcrypt.compare(userEntity.passwordHash, user.passwordHash);
        if (!isPasswordCorrect) {
            logger.error(`La contraseña es incorrecta : ${userEntity.email}`);
            throw Error('El email o el password son incorrectos');
        }

        const token = this.encrypt.encrypt({ userId: user.id });
        user.token = token;
        user.lastLogin = new Date();

        const userUpdated = await this.userRepository.updateUser(user.id, user);

        return {
            id: userUpdated.id,
            username: userUpdated.username,
            email: userUpdated.email,
            lastLogin: userUpdated.lastLogin,
            roleId: userUpdated.role.id,
            token: user.token
        };
    }
}