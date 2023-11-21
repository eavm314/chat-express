export interface IEncrypt {
    encrypt(data: any): string;
    decrypt(token: string): string;
}