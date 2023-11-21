import { IChatRepository } from "../../domain/interfaces/IChatRepository";
import { Chat } from "../../domain/models/Chat";
import logger from "../../infrastructure/logger/logger";

export class ChatService {
    
    constructor(private chatRepository: IChatRepository) {}

    async createChat(userIds: string[]): Promise<Chat> {
        logger.info("service, createChat");
        logger.debug(`service, createChat(${userIds.join(',')})`);
        // La lógica para crear un chat
        return this.chatRepository.createChat(userIds);
    }

    async getChatsByUserId(userId: string): Promise<Chat[]> {
        logger.info("service, getChatsByUserId");
        logger.debug(`service, getChatsByUserId(${userId})`);
        // La lógica para obtener los chats de un usuario
        return this.chatRepository.findChatsByUserId(userId);
    }

    async getChatById(chatId: string): Promise<Chat | null> {
        logger.info("service, getChatById");
        logger.debug(`service, getChatById(${chatId})`);
        // La lógica para obtener detalles de un chat específico
        return this.chatRepository.findChatById(chatId);
    }

    async deleteChat(chatId: string): Promise<void> {
        logger.info("service, deleteChat");
        logger.debug(`service, deleteChat(${chatId})`);
        // La lógica para eliminar un chat
        await this.chatRepository.deleteChat(chatId);
    }

    async isUserInChat(userId: string, chatId: string): Promise<boolean> {
        logger.info("service, isUserInChat");
        logger.debug(`service, isUserInChat(${userId},${chatId})`);
        const chat = await this.chatRepository.findChatById(chatId);
        return chat?.users.some(user => user.id === userId) ?? false;
    }
}
