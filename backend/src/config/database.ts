import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://root:xrxfp8g6@test-db-mongodb.ns-yiaog6co.svc:27017';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB连接成功');
  } catch (error) {
    console.error('MongoDB连接失败:', error);
    process.exit(1);
  }
}; 