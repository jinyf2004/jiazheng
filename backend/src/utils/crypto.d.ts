declare module '@/utils/crypto' {
  export function encrypt(text: string): { iv: string; encrypted: string };
  export function decrypt(hash: { iv: string; encrypted: string }): string;
}