import { Request, Response, Router } from 'express';
import { ChatService } from '../../app/services/ChatService';
import logger from '../../infrastructure/logger/logger';
import { CreateChatDto } from '../../app/dtos/CreateChatDto';
import { verifyChatParticipant } from '../middleware/verifyChatParticipant';


export class ChatController {
    public router: Router;
    private chatService: ChatService;
    private chatParticipantMiddleware;

    constructor(chatService: ChatService) {
        this.chatService = chatService;
        this.router = Router();
        this.chatParticipantMiddleware = verifyChatParticipant(chatService);
        this.routes();
    }

    public async createChat(req: Request, res: Response): Promise<Response> {
        try {
            const createChatDTO: CreateChatDto = req.body;
            const userIds: string[] = [req.user_id, createChatDTO.recieverId];
            logger.debug('Ids de Usuarios: ',userIds);
            const chat = await this.chatService.createChat(userIds);
            return res.status(201).json(chat);
        } catch (error) {
            logger.error(`Error creating chat, ${JSON.stringify(error)}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getChatsByUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.user_id; // Asegúrate de que este ID venga del token de autenticación
            const chats = await this.chatService.getChatsByUserId(userId);
            return res.json(chats);
        } catch (error) {
            logger.error(`Error fetching user chats, ${JSON.stringify(error)}`);
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
            logger.error(`Error fetching chat by ID, ${JSON.stringify(error)}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteChat(req: Request, res: Response): Promise<Response> {
        try {
            const chatId = req.params.chatId;
            await this.chatService.deleteChat(chatId);
            return res.status(200).json({ message: 'Chat deleted successfully' });
        } catch (error) {
            logger.error(`Error deleting chat, ${JSON.stringify(error)}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public routes() {
        this.router.post('/', this.createChat.bind(this));
        this.router.get('/user', this.getChatsByUser.bind(this));
        this.router.get('/:chatId', this.chatParticipantMiddleware,this.getChatById.bind(this));
        this.router.delete('/:chatId', this.chatParticipantMiddleware, this.deleteChat.bind(this));
    }
}
