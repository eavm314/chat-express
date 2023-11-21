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
import { MessageRepository } from '../../infrastructure/repositories/MessageRepository';
import { MessageService } from '../../app/services/MessageService';
import { MessageController } from './MessageController';
import { verifyChatParticipant } from '../middleware/verifyChatParticipant';
import { verifyToken } from '../middleware/verifyToken';

export const encrypt = new EncryptJwt();

export const redisService = new RedisCacheService();

const userRepository = new UserRepository();
const userService = new UserService(userRepository, redisService);
const userController = new UserController(userService);
const authService = new AuthService(userRepository, redisService);
const authController = new AuthController(authService);
const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);


const chatController = new ChatController(chatService);
const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService, chatService);



const API: string = '/api';

export const routes = (server: any) => {
    server.use(`${API}/user`, verifyToken, userController.router);
    server.use(`${API}/auth`, authController.router);
    server.use(`${API}/message`, verifyToken, messageController.router);
    server.use(`${API}/chat`, verifyToken, chatController.router);
};