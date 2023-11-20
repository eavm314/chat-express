import { IUserEntity } from "./IUserEntity";

export interface IMessageEntity {
    id?: string;
    content: string;
    sender: IUserEntity; // Referencia a la entidad de usuario
    sentAt: Date;
}
