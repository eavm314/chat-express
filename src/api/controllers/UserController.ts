import { Request, Response, Router } from 'express';
import { UserService } from '../../app/services/UserService';
import { UserResponseDto } from '../../app/dtos/UserResponseDto';
import { CreateUserDto } from '../../app/dtos/CreateUserDto';
import logger from '../../infrastructure/logger/logger';
import { verifyToken } from '../middleware/verifyToken';

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
        this.router = Router();
        this.routes();
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        logger.info("Obteniendo User");
        
        const id = req.user_id;

        logger.debug(`controller, getUser(${id})`);

        const userDto = await this.userService.getUserById(id);

        if (!userDto) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(userDto);
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        logger.info("Creando usuario");
        logger.debug(`controller, createUser(${req.body})`);

        try {
            const userDto: CreateUserDto = req.body;
            const user = await this.userService.createUser(userDto);
            return res.status(201).json({ message: "User created successfully", user });

        } catch (error: any) {
            logger.error(`Error al procesar la solicitud, ${JSON.stringify(error)}`);
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const id = req.user_id;
        try {
            logger.debug(`Intentando eliminar al usuario con ID: ${id}`);
            await this.userService.deleteUser(id);
            logger.info(`Usuario con ID: ${id} eliminado con éxito`);
            return res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } catch (error) {
            logger.error(`Error al eliminar al usuario, ${JSON.stringify(error)}`);
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        const id = req.user_id;
        const updateData = req.body;
        try {
            logger.debug(`Intentando actualizar al usuario con ID: ${id}`);
            const updatedUser = await this.userService.updateUser(id, updateData);
            logger.info(`Usuario con ID: ${id} actualizado con éxito`);
            return res.status(200).json({ user: updatedUser });
        } catch (error) {
            logger.error(`Error al actualizar al usuario, ${JSON.stringify(error)}`);
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    public routes() {
        // this.router.get('/:id', this.getUserById.bind(this));
        this.router.get('/', verifyToken, this.getUser.bind(this));
        this.router.post('/', this.createUser.bind(this));
        this.router.delete('/', verifyToken, this.deleteUser.bind(this));
        this.router.put('/', verifyToken, this.updateUser.bind(this));
    }
}