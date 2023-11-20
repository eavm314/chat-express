import { Request, Response, Router } from 'express';
import { ChatService } from '../../app/services/ChatService';
import logger from '../../infrastructure/logger/logger';

export class ChatController {
    public router: Router;
    private chatService: ChatService;

    constructor(chatService: ChatService) {
        this.chatService = chatService;
        this.router = Router();
        this.routes();
    }

    public async createChat(req: Request, res: Response): Promise<Response> {
        try {
            const userIds: string[] = req.body.userIds;
            const chat = await this.chatService.createChat(userIds);
            return res.status(201).json(chat);
        } catch (error) {
            logger.error('Error creating chat', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getChatsByUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.userId; // Asegúrate de que este ID venga del token de autenticación
            const chats = await this.chatService.getChatsByUserId(userId);
            return res.json(chats);
        } catch (error) {
            logger.error('Error fetching user chats', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getChatById(req: Request, res: Response): Promise<Response> {
        try {
            const chatId = req.params.chatId;
            const chat = await this.chatService.getChatById(chatId);
            if (!chat) {
                return res.status(404).json({ error: 'Chat not found' });
            }
            return res.json(chat);
        } catch (error) {
            logger.error('Error fetching chat by ID', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteChat(req: Request, res: Response): Promise<Response> {
        try {
            const chatId = req.params.chatId;
            await this.chatService.deleteChat(chatId);
            return res.status(200).json({ message: 'Chat deleted successfully' });
        } catch (error) {
            logger.error('Error deleting chat', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public routes() {
        this.router.post('/', this.createChat.bind(this));
        this.router.get('/user/:userId', this.getChatsByUser.bind(this));
        this.router.get('/:chatId', this.getChatById.bind(this));
        this.router.delete('/:chatId', this.deleteChat.bind(this));
    }
}
