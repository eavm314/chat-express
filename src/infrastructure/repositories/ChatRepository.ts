import { AppDataSource } from "../config/dataSource";
import { ChatEntity } from "../entities/ChatEntity";
import { UserEntity } from "../entities/UserEntity";
import { IChatRepository } from "../../domain/interfaces/IChatRepository";
import { Chat } from "../../domain/models/Chat";

export class ChatRepository implements IChatRepository {
    private chatRepository = AppDataSource.getRepository(ChatEntity);

    async createChat(userIds: string[]): Promise<Chat> {
        const users = await AppDataSource.getRepository(UserEntity).findByIds(userIds);
        const newChat = this.chatRepository.create({ users });
        console.log(newChat);

        const savedChat = await this.chatRepository.save(newChat);
        return new Chat(savedChat);
    }

    async findChatsByUserId(userId: string): Promise<Chat[]> {
        const chats = await this.chatRepository
            .createQueryBuilder("chat")
            .leftJoinAndSelect("chat.users", "user")
            .where("user.id = :userId", { userId })
            .getMany();

        return chats.map(chat => new Chat(chat));
    }

    async findChatById(chatId: string): Promise<Chat | null> {
        const chat = await this.chatRepository.findOne({
            where: { id: chatId },
            relations: ['users', 'messages']
        });
        return chat ? new Chat(chat) : null;
    }

    async deleteChat(chatId: string): Promise<void> {
        const chat = await this.chatRepository.findOneBy({ id: chatId });
        if (chat) {
            await this.chatRepository.remove(chat);
        }
    }
}
