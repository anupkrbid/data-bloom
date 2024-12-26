require('dotenv').config();

const { sequelize } = require('./sequelize/config');
const { connectRedisClient, redisClient } = require('./redis');
const app = require('./app');

(async () => {
  try {
    await connectRedisClient();
    await sequelize.sync();

    console.log('Database connected successfully.');

    await app.listen(process.env.PORT);

    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.error('Failed to start the application:', error);
    await sequelize.close();
    await redisClient.disconnect();
    process.exit(1);
  }
})();
