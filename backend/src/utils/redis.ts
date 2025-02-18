import { createClient, RedisClientType } from 'redis';

const client: RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => {
  console.error(`Redis Error: ${err.stack}`);
  process.exit(1);
});

client.on('connect', () => {
  console.log('Redis connected on', process.env.REDIS_URL || 'redis://localhost:6379');
});

export const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Redis connection established');
  } catch (error) {
    console.error(`Connection failed: ${error}`);
  }
};

export const getCache = async (key: string): Promise<string | null> => {
  try {
    const data = await client.get(key);
    return data;
  } catch (err) {
    throw new Error(`Failed to get cache for key ${key}: ${err}`);
  }
};

export const setCache = async (key: string, value: string, ttl: number): Promise<string | null> => {
  try {
    const reply = await client.set(key, value, { EX: ttl });
    return reply;
  } catch (err) {
    throw new Error(`Failed to set cache for key ${key}: ${err}`);
  }
};