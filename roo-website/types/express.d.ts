declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        tier: 'free' | 'pro';
        sessionId: string;
      };

      // 埋点追踪ID
      traceId?: string;
    }
  }
}

export {};

interface JwtPayload {
  sub: string;
}