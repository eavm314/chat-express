import { IChatEntity } from '../entities/IChatEntity';
import { IMessageEntity } from '../entities/IMessageEntity';
import { IUserEntity } from '../entities/IUserEntity';

export class Chat {
    id: string;
    users: IUserEntity[];
    messages?: IMessageEntity[];

    constructor(chatEntity: IChatEntity) {
        this.id = chatEntity.id;
        this.users = chatEntity.users;
        this.messages = chatEntity.messages;
    }
}
