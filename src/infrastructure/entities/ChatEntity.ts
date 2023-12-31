import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { UserEntity } from "./UserEntity";
import { MessageEntity } from "./MessageEntity";
import { IChatEntity } from "../../domain/entities/IChatEntity";

@Entity()
export class ChatEntity implements IChatEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToMany(() => UserEntity)
    @JoinTable() 
    users!: UserEntity[];

    @OneToMany(() => MessageEntity, message => message.chat)
    messages: MessageEntity[];
}
