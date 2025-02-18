export interface User {
  id: string;
  name: string;
  tier: 'free' | 'pro';
  sessionId: string;
}