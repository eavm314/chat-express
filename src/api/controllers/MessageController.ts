import { Request, Response, Router } from 'express';
import { MessageService } from '../../app/services/MessageService';
import logger from '../../infrastructure/logger/logger';

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
            const senderId = req.body.senderId; // Este ID también debería venir del token de autenticación
            const content = req.body.content;

            const message = await this.messageService.createMessage(chatId, senderId, content);
            return res.status(201).json(message);
        } catch (error) {
            logger.error('Error sending message', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getMessagesByChat(req: Request, res: Response): Promise<Response> {
        try {
            const chatId = req.params.chatId;
            const messages = await this.messageService.getMessagesByChatId(chatId);
            return res.json(messages);
        } catch (error) {
            logger.error('Error fetching messages', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // async updateMessage(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const messageId = req.params.messageId;
    //         const content = req.body.content;

    //         await this.messageService.updateMessage(messageId, content);
    //         return res.status(200).json({ message: 'Message updated successfully' });
    //     } catch (error) {
    //         logger.error('Error updating message', error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // }

    // async deleteMessage(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const messageId = req.params.messageId;
    //         await this.messageService.deleteMessage(messageId);
    //         return res.status(200).json({ message: 'Message deleted successfully' });
    //     } catch (error) {
    //         logger.error('Error deleting message', error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // }

    public routes() {
        this.router.post('/:chatId/messages', this.createMessage.bind(this));
        this.router.get('/:chatId/messages', this.getMessagesByChat.bind(this));
        // this.router.put('/:chatId/messages/:messageId', this.updateMessage.bind(this));
        // this.router.delete('/:chatId/messages/:messageId', this.deleteMessage.bind(this));
    }
}
