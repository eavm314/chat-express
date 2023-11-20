import "reflect-metadata";
import { db } from "../config/config";
import { DataSource } from "typeorm";
import { MySqlDatasource } from "./mySqlDataSource";
import { PGDataSource } from "./pgDataSource";

const db_options:{[key: string]: DataSource} = {
    "mysql": MySqlDatasource,
    "postgres": PGDataSource,
}

export const AppDataSource = db_options[db.type] ?? MySqlDatasource