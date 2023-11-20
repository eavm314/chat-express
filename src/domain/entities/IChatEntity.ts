import { IMessageEntity } from "./IMessageEntity";
import { IUserEntity } from "./IUserEntity";

export interface IChatEntity {
    id?: string;
    users: IUserEntity[]; // Referencia a las entidades de usuario
    messages: IMessageEntity[]; // Referencia a las entidades de mensaje
}
