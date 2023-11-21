import jwt from "jsonwebtoken"

import { IEncrypt } from "../../app/utils/IEncrypt";
import { jwt as jwtConfig } from "../config/config";

export class EncryptJwt implements IEncrypt {
    encrypt(data: any): string {
        const token = jwt.sign(data, jwtConfig.secretKey, { expiresIn: jwtConfig.expirationTime });
        return token;
    }
    decrypt(token: string): any {
        let returnedValue;
        jwt.verify(token, jwtConfig.secretKey, (err, data: any) => {
            if (err) {
                throw new Error(err.message);
            }
            returnedValue = data;
        });

        return returnedValue;
    }
    
}