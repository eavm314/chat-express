import { ChatController } from './ChatController';
import { ChatRepository } from './../../infrastructure/repositories/ChatRepository';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { UserService } from '../../app/services/UserService';
import { UserController } from './UserController';
import { AuthService } from '../../app/services/AuthService';
import { AuthController } from './AuthController';
import { EncryptJwt } from '../../infrastructure/utils/EncryptJwt';
import { RedisCacheService } from '../../infrastructure/cache/RedisCacheService';
import { ChatService } from '../../app/services/ChatService';

const encrypt = new EncryptJwt();

const redisService = new RedisCacheService();

const userRepository = new UserRepository();
const userService = new UserService(userRepository, redisService);
const userController = new UserController(userService);
const authService = new AuthService(userRepository, encrypt, redisService);
const authController = new AuthController(authService);
const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);  
const messageRepository = new ChatRepository();
const messageService = new ChatService(messageRepository);
const messageController = new ChatController(messageService);

const API:string = '/api';

export const routes = (server: any) => {
    server.use(`${API}/user`, userController.router);
    server.use(`${API}/auth`, authController.router);
    server.use(`${API}/message`, messageController.router);
    server.use(`${API}/chat`, chatController.router);
};