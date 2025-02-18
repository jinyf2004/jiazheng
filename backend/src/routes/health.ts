import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as redis from 'redis';

const router = Router();
const redisClient = redis.createClient();

router.get('/health', (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const redisStatus = redisClient.isOpen ? 'connected' : 'disconnected';

  res.json({
    status: 'UP',
    db: dbStatus,
    redis: redisStatus,
    timestamp: Date.now()
  });
});

export default router;