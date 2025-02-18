import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

export const redisClient = createClient({
  url: REDIS_URL
});

export async function connectRedis() {
  try {
    await redisClient.connect();
    console.log(`Connected to Redis at ${REDIS_URL}`);
  } catch (err) {
    console.error('Redis Connection Error:', err);
    process.exit(1);
  }
}

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});