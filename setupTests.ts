import { Redis } from 'ioredis';

// Mock Redis client
jest.mock('ioredis', () => {
  const mockRedis = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
    on: jest.fn(),
    quit: jest.fn(),
  };

  return jest.fn(() => mockRedis);
});

// Other setup code if needed