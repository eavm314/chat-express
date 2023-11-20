import { Chat } from "../models/Chat";

export interface IChatRepository {
    createChat(userIds: string[]): Promise<Chat>;
    findChatsByUserId(userId: string): Promise<Chat[]>;
    findChatById(chatId: string): Promise<Chat | null>;
    deleteChat(chatId: string): Promise<void>;
}
