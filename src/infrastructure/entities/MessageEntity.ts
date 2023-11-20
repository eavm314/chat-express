import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./UserEntity";
import { ChatEntity } from "./ChatEntity";
import { IMessageEntity } from "../../domain/entities/IMessageEntity";

@Entity()
export class MessageEntity implements IMessageEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("text")
    content!: string;

    @ManyToOne(() => ChatEntity, chat => chat.messages)
    chat!: ChatEntity;

    @ManyToOne(() => UserEntity)
    sender!: UserEntity;

    @Column("timestamp")
    sentAt!: Date;
}
