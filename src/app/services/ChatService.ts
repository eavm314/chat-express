import { IChatRepository } from "../../domain/interfaces/IChatRepository";
import { Chat } from "../../domain/models/Chat";

export class ChatService {
    constructor(private chatRepository: IChatRepository) {}

    async createChat(userIds: string[]): Promise<Chat> {
        // La lógica para crear un chat
        console.log('aaa')
        return this.chatRepository.createChat(userIds);
    }

    async getChatsByUserId(userId: string): Promise<Chat[]> {
        // La lógica para obtener los chats de un usuario
        return this.chatRepository.findChatsByUserId(userId);
    }

    async getChatById(chatId: string): Promise<Chat | null> {
        // La lógica para obtener detalles de un chat específico
        return this.chatRepository.findChatById(chatId);
    }

    async deleteChat(chatId: string): Promise<void> {
        // La lógica para eliminar un chat
        await this.chatRepository.deleteChat(chatId);
    }
}
