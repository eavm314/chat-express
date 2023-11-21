import { Request, Response, NextFunction } from "express";
import { ChatService } from "../../app/services/ChatService";


export function verifyChatParticipant(chatService: ChatService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user_id; // Obtenido del token de autenticación
            const chatId = req.params.chatId;
            const isParticipant = await chatService.isUserInChat(userId, chatId);
            if (!isParticipant) {
                return res.status(403).json({ error: 'Acceso denegado' });
            }
    
            next();
        } catch (error) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
}
