import { Request, Response, Router } from 'express';
import { LoginDto } from '../../app/dtos/LoginDto';
import { AuthService } from '../../app/services/AuthService';
import logger from '../../infrastructure/logger/logger';

export class AuthController {
    public router: Router;
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.router = Router();
        this.routes();
    }

    public async login(req: Request, res: Response): Promise<Response> {
        logger.info("User Login");
        logger.debug(`User Login, ${JSON.stringify(req.body)}`);
        try {
            const loginDTO: LoginDto = req.body;
            const loginResponse = await this.authService.login(loginDTO);
            return res.status(200).json(loginResponse);
        } catch (error) {
            logger.error(`Error login user, ${JSON.stringify(error)}`);
            if (error instanceof Error)
                return res.status(400).json({ message: error.message });
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public routes() {
        this.router.post('/login', this.login.bind(this));
    }
}