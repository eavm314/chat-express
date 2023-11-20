import "reflect-metadata";
import { pg } from "../config/config";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";

export const PGDataSource = new DataSource({
    type: "postgres",
    host: pg.host,
    port: pg.port,
    username: pg.user,
    password: pg.password,
    database: pg.name,
    synchronize: true,
    logging: false,
    entities: [UserEntity],
    subscribers: [],
    migrations: [],
    ssl: true
});