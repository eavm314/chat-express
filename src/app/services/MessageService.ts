import { ICacheService } from "../../domain/interfaces/ICacheService";
import { IMessageRepository } from "../../domain/interfaces/IMessageRepository";
import { Message } from "../../domain/models/Message";
import logger from "../../infrastructure/logger/logger";

export class MessageService {
    constructor(
        private messageRepository: IMessageRepository,
        private cacheService: ICacheService,
        ) {}

    async createMessage(chatId: string, senderId: string, content: string): Promise<Message> {
        logger.info("service, createMessage");
        logger.debug(`service, createMessage(${chatId}, ${senderId}, ${content})`);

        // La lógica para enviar un mensaje nuevo
        this.cacheService.remove(`CHAT:${chatId}`);
        return this.messageRepository.createMessage(chatId, senderId, content);
    }

    async getMessagesByChatId(chatId: string): Promise<Message[]> {
        logger.info("service, getMessagesByChatId");
        logger.debug(`service, getMessagesByChatId(${chatId})`);
        
        // La lógica para obtener mensajes en un chat
        const messagesCache = await this.cacheService.get(`CHAT:${chatId}`);

        if (messagesCache){
            const response = JSON.parse(messagesCache) as Message[];
            return response;
        }

        const messages = this.messageRepository.findMessagesByChatId(chatId);
        this.cacheService.set(`CHAT:${chatId}`, JSON.stringify(messages));

        return messages;
    }

    // Métodos para actualizar y eliminar mensajes, si es necesario
}
