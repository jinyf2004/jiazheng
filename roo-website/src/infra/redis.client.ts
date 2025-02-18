import { createClient } from 'redis';
import { ExponentialStrategy } from './ExponentialStrategy';
import { env } from '../config/env';
import { Metrics } from './Metrics';

const client = createClient({
  url: `redis://${env.REDIS_USER}:${env.REDIS_PASS}@${env.REDIS_HOST}`,
  socket: {
    tls: env.NODE_ENV === 'production',
    connectTimeout: 5000,
    ...new ExponentialStrategy({ 
      baseDelay: 100,
      maxDelay: 5000 
    })
  }
});

// 连接监控埋点
client.on('connect', () => 
  Metrics.capture('redis_connected', 1));
client.on('error', (err) => 
  Metrics.capture('redis_errors', 1, { code: err.code }));

export const redis = client;