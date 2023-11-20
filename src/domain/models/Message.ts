import { IMessageEntity } from '../entities/IMessageEntity';
import { IUserEntity } from '../entities/IUserEntity';

export class Message {
    id: string;
    content: string;
    sender: IUserEntity;
    sentAt: Date;

    constructor(messageEntity: IMessageEntity) {
        this.id = messageEntity.id;
        this.content = messageEntity.content;
        this.sender = messageEntity.sender;
        this.sentAt = messageEntity.sentAt;
    }
}
