import { Request, Response, NextFunction } from 'express';
import { encrypt } from '../controllers/apiRoutes';



export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            const user = encrypt.decrypt(token);
            req.user_id = user.userId;
            next();
        } catch (error) {
            res.status(403).json({ message: "Token inválido o expirado" });
        }
    } else {
        res.status(401).json({ message: "Token no proporcionado" });
    }
};
