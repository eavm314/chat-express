import { Message } from "../models/Message";

export interface IMessageRepository {
    createMessage(chatId: string, senderId: string, content: string): Promise<Message>;
    findMessagesByChatId(chatId: string): Promise<Message[]>;
    updateMessage(messageId: string, content: string): Promise<void>;
    deleteMessage(messageId: string): Promise<void>;
}
