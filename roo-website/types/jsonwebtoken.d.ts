declare module 'jsonwebtoken' {
  export function verify(token: string, secret: string): any;
}