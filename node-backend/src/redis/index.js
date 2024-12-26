const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL
});

async function connectRedisClient() {
  await redisClient
    .on('connect', () => console.log('Redis client connecting...'))
    .on('ready', () => console.log('Redis client connected and ready'))
    .on('error', (err) => console.log('Redis Client Error', err))
    .on('reconnecting', () =>
      console.log('Redis client attempting to reconnect...')
    )
    .on('end', () => console.log('Redis client connection closed'))
    .connect();
}

module.exports = { redisClient, connectRedisClient };
