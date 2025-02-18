export const env = {
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
  REDIS_USER: process.env.REDIS_USER || 'default_user',
  REDIS_PASS: process.env.REDIS_PASS || 'default_pass',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  NODE_ENV: process.env.NODE_ENV || 'development'
};