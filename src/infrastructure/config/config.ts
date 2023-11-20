import dotenv from 'dotenv'

dotenv.config();

export const env = {
    port: parseInt(process.env.ENV_PORT) || 3000,
    env: process.env.ENV || "develop",
};

export const mysql = {
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    name: process.env.MYSQL_NAME || "name",
    user: process.env.MYSQL_USER || "user",
    password: process.env.MYSQL_PASS || "123",
};

export const lg = {
    level: process.env.LG_LEVEL || "info",
}

export const jwt = {
    secretKey: process.env.JWT_SECRET || 'your_secret_key',
    expirationTime: process.env.JWT_EXPIRATION_TIME || '1h',
}

export const redis_env = {
    url: process.env.RD_URL || 'localhost',
}

export const pg = {
    host: process.env.PG_HOST || "localhost",
    port: parseInt(process.env.PG_PORT) || 5432,
    name: process.env.PG_NAME || "name",
    user: process.env.PG_USER || "user",
    password: process.env.PG_PASS || "123",
}

export const db = {
    type: (process.env.DB_TYPE || "mysql"),
}