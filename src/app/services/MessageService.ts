import { IMessageRepository } from "../../domain/interfaces/IMessageRepository";
import { Message } from "../../domain/models/Message";

export class MessageService {
    constructor(private messageRepository: IMessageRepository) {}

    async createMessage(chatId: string, senderId: string, content: string): Promise<Message> {
        // La lógica para enviar un mensaje nuevo
        return this.messageRepository.createMessage(chatId, senderId, content);
    }

    async getMessagesByChatId(chatId: string): Promise<Message[]> {
        // La lógica para obtener mensajes en un chat
        return this.messageRepository.findMessagesByChatId(chatId);
    }

    // Métodos para actualizar y eliminar mensajes, si es necesario
}
