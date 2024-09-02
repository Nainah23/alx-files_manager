import { createClient } from 'redis';

class RedisClient {
  constructor() {
    // Create Redis client
    this.client = createClient();

    // Listen for errors and log them to the console
    this.client.on('error', (error) => {
      console.error('Redis Client Error:', error);
    });

    // Connect to Redis
    this.client.connect().catch(console.error);
  }

  // Check if Redis client is connected
  isAlive() {
    return this.client.isReady;
  }

  // Get a value from Redis by key
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error('Error getting key from Redis:', error);
      return null;
    }
  }

  // Set a value in Redis with an expiration time in seconds
  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
    } catch (error) {
      console.error('Error setting key in Redis:', error);
    }
  }

  // Delete a key from Redis
  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Error deleting key from Redis:', error);
    }
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
