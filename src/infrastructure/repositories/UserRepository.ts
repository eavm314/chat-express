import bcrypt from "bcrypt";

import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserEntity } from "../entities/UserEntity";
import { AppDataSource } from "../config/dataSource";
import { User } from "../../domain/models/User";
import logger from "../logger/logger";

export class UserRepository implements IUserRepository {
    
    async findById(id: string): Promise<User | null> {
        logger.info("repository, findById");
        logger.debug(`repository, findById(${id})`);
        const userRepository = AppDataSource.getRepository(UserEntity);
        const user = await userRepository.findOne({
            where: { id },
            // relations: ['role']
        });
        return user ? new User(user) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(UserEntity);
        const user = await userRepository.findOne({
            where: { email }
        });
        return user ? new User(user) : null;
    }

    async createUser(user: User): Promise<User> {
        logger.info("repository, createUser");
        logger.debug(`repository, createUser(${user})`);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.passwordHash, salt);

        const userEntity = AppDataSource.getRepository(UserEntity).create({
            username: user.username,
            email: user.email,
            passwordHash: hash,
            createdAt: user.createdAt || new Date(),
        });

        const userResponse = await AppDataSource.getRepository(UserEntity).save(userEntity);
        return new User({
            id: userResponse.id,
            username: userResponse.username,
            email: userResponse.email,
            passwordHash: userResponse.passwordHash,
            createdAt: userResponse.createdAt,
        })
    }

    async deleteUser(id: string): Promise<void> {

        const repository = AppDataSource.getRepository(UserEntity);
        const user = await repository.findOneBy({ id });

        if (!user) {
            logger.error(`UserRepository: Error al eliminar al usuario con ID: ${id}.`);
            throw new Error('Usuario no encontrado');
        }

        await repository.remove(user);
    }

    async updateUser(id: string, updateData: Partial<User>): Promise<User> {
        const repository = AppDataSource.getRepository(UserEntity);
        const user = await repository.findOneBy({ id });

        if (!user) {
            logger.error(`UserRepository: Error al modificar al usuario con ID: ${id}.`);
            throw new Error('Usuario no encontrado');
        }

        // if (user.role.id !== updateData.roleId)
        // get role a partir del updateData.roleId
        // if (!role) 
        // user.role = role

        repository.merge(user, updateData);
        const updatedUser = await repository.save(user);
        return new User(updatedUser);
    }
}