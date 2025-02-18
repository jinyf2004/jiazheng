import * as crypto from 'crypto';

export interface CryptoResult {
  iv: string;
  encrypted: string;
}

export const encrypt = (data: string, secret: string): CryptoResult => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', 
    Buffer.from(secret.padEnd(32, '0').slice(0, 32)), 
    iv
  );

  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return {
    iv: iv.toString('hex'),
    encrypted: encrypted.toString('hex')
  };
};

export const decrypt = (data: CryptoResult, secret: string): string => {
  const iv = Buffer.from(data.iv, 'hex');
  const encryptedText = Buffer.from(data.encrypted, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-cbc',
    Buffer.from(secret.padEnd(32, '0').slice(0, 32)),
    iv
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};