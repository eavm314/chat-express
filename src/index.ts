import express, { Request, Response } from 'express';
import morgan from "morgan";

import logger from "./infrastructure/logger/logger";
import { AppDataSource } from "./infrastructure/db/dataSource";
import { env } from './infrastructure/config/config';
import { routes } from './api/controllers/apiRoutes';


AppDataSource.initialize().then(() => {
    const app = express();

    app.use(
        morgan("combined", {
            stream: { write: (message: string) => logger.info(message.trim()) },
        })
    );

    const PORT = env.port;
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send('Servidor Up');
    });

    routes(app);

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}).catch(error => logger.error(`Error al conectar la Base de Datos: ${JSON.stringify(error)}`));