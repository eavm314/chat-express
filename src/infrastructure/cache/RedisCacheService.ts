import { createClient } from "redis";
import { ICacheService } from "../../domain/interfaces/ICacheService";
import { redis_env } from "../config/config";
import logger from "../logger/logger";

export class RedisCacheService implements ICacheService {
    private client;

    constructor() {
        this.client = createClient({ url: redis_env.url });
        this.client.connect();
    }

    async get(key: string): Promise<string> {
        logger.debug(`Cache recuperado: ${key}`);
        return this.client.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        logger.debug(`Cache guardado: (${key},${value})`);
        await this.client.set(key, value);
    }
    
    async remove(key: string): Promise<void> {
        logger.debug(`Cache removido: ${key}`);
        await this.client.del(key);
    }
}