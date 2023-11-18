export interface IEncrypt {
    encrypt(data: any): string;
    decrypt(text: string): string;
}