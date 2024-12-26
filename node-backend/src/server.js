require('dotenv').config();

const { sequelize } = require('./sequelize/config');
const {
  redisClient,
  connectRedisClient,
  disconnectRedisClient
} = require('./redis');
const { cronJobs } = require('./cron-jobs');
const app = require('./app');

(async () => {
  try {
    await connectRedisClient();
    await sequelize.sync();

    await cronJobs.start();

    console.log('Database connected successfully.');

    await app.listen(process.env.PORT);

    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.error('Failed to start the application:', error);
    await cronJobs.stop();
    await sequelize.close();
    await disconnectRedisClient();
    process.exit(1);
  }
})();
