import { User } from '../models/User';

class UserService {
  private users: User[] = [
    { id: '1', name: 'John Doe', tier: 'free', sessionId: 'session1' },
    { id: '2', name: 'Jane Smith', tier: 'pro', sessionId: 'session2' }
  ];

  public async getUserById(userId: string): Promise<User | undefined> {
    return this.users.find(user => user.id === userId);
  }
}

export const userService = new UserService();