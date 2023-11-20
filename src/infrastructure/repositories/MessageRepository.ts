import { AppDataSource } from "../config/dataSource";
import { MessageEntity } from "../entities/MessageEntity";
import { IMessageRepository } from "../../domain/interfaces/IMessageRepository";
import { Message } from "../../domain/models/Message";
import { UserEntity } from "../entities/UserEntity";
import { ChatEntity } from "../entities/ChatEntity";

export class MessageRepository implements IMessageRepository {
    private messageRepository = AppDataSource.getRepository(MessageEntity);

    async createMessage(chatId: string, senderId: string, content: string): Promise<Message> {
        const chat = await AppDataSource.getRepository(ChatEntity).findOneBy({ id: chatId });
        const sender = await AppDataSource.getRepository(UserEntity).findOneBy({ id: senderId });

        if (!chat || !sender) {
            throw new Error("Chat o usuario no encontrado.");
        }

        const newMessage = this.messageRepository.create({
            content: content,
            chat: chat, 
            sender: sender,
            sentAt: new Date()
        });

        const savedMessage = await this.messageRepository.save(newMessage);
        return new Message(savedMessage);
    }

    async findMessagesByChatId(chatId: string): Promise<Message[]> {
        const messages = await this.messageRepository.find({
            where: { chat: { id: chatId } },
            relations: ['sender']
        });

        return messages.map(message => new Message(message));
    }

    async updateMessage(messageId: string, content: string): Promise<void> {
        const message = await this.messageRepository.findOneBy({ id: messageId });
        if (message) {
            message.content = content;
            await this.messageRepository.save(message);
        }
    }

    async deleteMessage(messageId: string): Promise<void> {
        const message = await this.messageRepository.findOneBy({ id: messageId });
        if (message) {
            await this.messageRepository.remove(message);
        }
    }
}
