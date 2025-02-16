import { createClient, RedisClientType } from 'redis';

const client: RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Redis连接成功');
  } catch (error) {
    console.error('Redis连接失败:', error);
    process.exit(1);
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