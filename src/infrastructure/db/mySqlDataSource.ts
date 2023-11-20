import "reflect-metadata";
import { mysql } from "../config/config";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { MessageEntity } from "../entities/MessageEntity";
import { ChatEntity } from "../entities/ChatEntity";

export const MySqlDatasource = new DataSource({
    type: "mysql",
    host: mysql.host,
    port: mysql.port,
    username: mysql.user,
    password: mysql.password,
    database: mysql.name,
    synchronize: true,
    logging: false,
    entities: [UserEntity, MessageEntity, ChatEntity],
    subscribers: [],
    migrations: [],
});