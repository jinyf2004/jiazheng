import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://root:xrxfp8g6@test-db-mongodb.ns-yiaog6co.svc:27017';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10, // 新版本连接池参数
      serverSelectionTimeoutMS: 5000, // 服务器选择超时
      socketTimeoutMS: 45000, // socket超时时间
      family: 4, // 使用IPv4
      readPreference: 'primaryPreferred' // 读写偏好设置
    });

    // 自动创建索引
    mongoose.set('autoIndex', true);
    mongoose.set('debug', process.env.NODE_ENV === 'development');

    console.log('MongoDB连接成功');
  } catch (error) {
    console.error('MongoDB连接失败:', error);
    process.exit(1);
  }
}; 

// 连接事件监听
mongoose.connection.on('disconnected', () => console.log('MongoDB连接断开'));