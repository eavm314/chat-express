import jwt from "jsonwebtoken"

import { IEncrypt } from "../../app/utils/IEncrypt";
import { jwt as jwtConfig } from "../config/config";

export class EncryptJwt implements IEncrypt {
    encrypt(data: any): string {
        const token = jwt.sign(data, jwtConfig.secretKey, { expiresIn: jwtConfig.expirationTime });
        return token;
    }
    decrypt(text: string): string {
        throw new Error("Method not implemented.");
    }
    
}