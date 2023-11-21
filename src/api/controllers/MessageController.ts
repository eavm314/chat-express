import { Request, Response, Router } from 'express';
import { MessageService } from '../../app/services/MessageService';
import logger from '../../infrastructure/logger/logger';
import { verifyToken } from '../middleware/verifyToken';
import { SendMessageDto } from '../../app/dtos/SendMessageDto';

export class MessageController {
    public router: Router;
    private messageService: MessageService;

    constructor(messageService: MessageService) {
        this.messageService = messageService;
        this.router = Router();
        this.routes();
    }

    async createMessage(req: Request, res: Response): Promise<Response> {
        try {
            const chatId = req.params.chatId;
            const senderId = req.user_id; // Este ID también debería venir del token de autenticación

            const body: SendMessageDto = req.body;

            const message = await this.messageService.createMessage(chatId, senderId, body.content);
            return res.status(201).json(message);
        } catch (error) {
            logger.error(`Error sending message, ${JSON.stringify(error)}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getMessagesByChat(req: Request, res: Response): Promise<Response> {
        try {
            const chatId = req.params.chatId;
            const messages = await this.messageService.getMessagesByChatId(chatId);
            return res.json(messages);
        } catch (error) {
            logger.error(`Error fetching messages, ${JSON.stringify(error)}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public routes() {
        this.router.post('/:chatId', verifyToken, this.createMessage.bind(this));
        this.router.get('/:chatId', verifyToken, this.getMessagesByChat.bind(this));
    }
}
