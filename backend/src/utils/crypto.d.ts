declare module 'utils/crypto' {
  export interface CryptoResult {
    iv: string;
    encrypted: string;
  }

  export function encrypt(text: string, secret: string): CryptoResult;
  export function decrypt(data: CryptoResult, secret: string): string;
}