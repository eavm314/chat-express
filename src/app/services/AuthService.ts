import bcrypt from "bcrypt";

import { IUserEntity } from "../../domain/entities/IUserEntity";
import { User } from "../../domain/models/User";
import logger from "../../infrastructure/logger/logger";
import { LoginDto } from "../dtos/LoginDto";
import { UserResponseDto } from "../dtos/UserResponseDto";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { IEncrypt } from "../utils/IEncrypt";
import { ICacheService } from "../../domain/interfaces/ICacheService";
import { encrypt } from "../../api/controllers/apiRoutes";

export class AuthService {

    constructor(
        private userRepository: IUserRepository, 
        private cacheService: ICacheService
    ) { }

    async getCache() {
        const sol = await this.cacheService.get('USER:627c8259-e1d2-4a0a-9d8a-2528b9a395f7');
        console.log(sol);
    }

    async login(loginDTO: LoginDto): Promise<UserResponseDto> {
        logger.info("service, login");
        logger.debug(`service, login(${Object.entries(loginDTO)})`);
        const userEntity: Partial<IUserEntity> = {
            email: loginDTO.email,
            passwordHash: loginDTO.password
        };
        
        const user: User = await this.userRepository.findByEmail(userEntity.email);

        if (!user) {
            logger.error(`El usuario con el email: ${userEntity.email} no existe`);
            throw Error('El email proporcionado no existe');
        }

        this.cacheService.set(`USER:${user.id}`, JSON.stringify(user));

        const isPasswordCorrect = await bcrypt.compare(userEntity.passwordHash, user.passwordHash);
        if (!isPasswordCorrect) {
            logger.error(`La contraseña es incorrecta : ${userEntity.email}`);
            throw Error('El email o el password son incorrectos');
        }

        const token = encrypt.encrypt({ userId: user.id });
        user.token = token;

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            token: user.token
        };
    }
}