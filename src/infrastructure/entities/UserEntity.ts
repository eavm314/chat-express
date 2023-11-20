import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { IUserEntity } from '../../domain/entities/IUserEntity';
import { ChatEntity } from "./ChatEntity";

@Entity()
export class UserEntity implements IUserEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: 'varchar' })
    username!: string;

    @Column({ type: 'varchar', unique: true })
    email!: string;

    @Column({ type: 'varchar' })
    passwordHash!: string;

    @Column({ type: 'timestamp' })
    createdAt!: Date;

    @ManyToMany(() => ChatEntity)
    @JoinTable() // Esto crea una tabla de unión para la relación many-to-many
    chats: ChatEntity[];
}