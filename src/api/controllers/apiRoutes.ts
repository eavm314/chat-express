import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { UserService } from '../../app/services/UserService';
import { UserController } from './UserController';
import { AuthService } from '../../app/services/AuthService';
import { AuthController } from './AuthController';
import { EncryptJwt } from '../../infrastructure/utils/EncryptJwt';
import { RedisCacheService } from '../../infrastructure/cache/RedisCacheService';

const encrypt = new EncryptJwt();

const redisService = new RedisCacheService();

const userRepository = new UserRepository();
const userService = new UserService(userRepository, redisService);
const userController = new UserController(userService);
const authService = new AuthService(userRepository, encrypt, redisService);
const authController = new AuthController(authService);

const API:string = '/api';

export const routes = (server: any) => {
    server.use(`${API}/users`, userController.router);
    server.use(`${API}/auth`, authController.router);
};