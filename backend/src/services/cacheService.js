const Redis = require('ioredis');
const logger = require('../utils/logger');

class CacheService {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
    });

    this.redis.on('error', (err) => {
      logger.error('Redis connection error:', err);
    });

    this.redis.on('connect', () => {
      logger.info('Connected to Redis');
    });
  }

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {Promise<any>} Cached value or null
   */
  async get(key) {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Set value in cache
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in seconds (default: 1 hour)
   * @returns {Promise<void>}
   */
  async set(key, value, ttl = 3600) {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      logger.error('Cache set error:', error);
    }
  }

  /**
   * Delete key from cache
   * @param {string} key - Cache key
   * @returns {Promise<void>}
   */
  async del(key) {
    try {
      await this.redis.del(key);
    } catch (error) {
      logger.error('Cache delete error:', error);
    }
  }

  /**
   * Check if key exists in cache
   * @param {string} key - Cache key
   * @returns {Promise<boolean>}
   */
  async exists(key) {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      logger.error('Cache exists error:', error);
      return false;
    }
  }

  /**
   * Get restaurant autocomplete suggestions from cache
   * @param {string} query - Search query
   * @returns {Promise<Array|null>} Cached suggestions or null
   */
  async getAutocompleteSuggestions(query) {
    const key = `autocomplete:${query.toLowerCase().trim()}`;
    return await this.get(key);
  }

  /**
   * Cache restaurant autocomplete suggestions
   * @param {string} query - Search query
   * @param {Array} suggestions - Suggestions to cache
   * @returns {Promise<void>}
   */
  async setAutocompleteSuggestions(query, suggestions) {
    const key = `autocomplete:${query.toLowerCase().trim()}`;
    await this.set(key, suggestions, 1800); // 30 minutes TTL
  }

  /**
   * Get restaurant details from cache
   * @param {string} placeId - Google Place ID
   * @returns {Promise<Object|null>} Cached restaurant details or null
   */
  async getRestaurantDetails(placeId) {
    const key = `restaurant:${placeId}`;
    return await this.get(key);
  }

  /**
   * Cache restaurant details
   * @param {string} placeId - Google Place ID
   * @param {Object} details - Restaurant details to cache
   * @returns {Promise<void>}
   */
  async setRestaurantDetails(placeId, details) {
    const key = `restaurant:${placeId}`;
    await this.set(key, details, 7200); // 2 hours TTL
  }

  /**
   * Get restaurant dishes from cache
   * @param {string} placeId - Google Place ID
   * @returns {Promise<Array|null>} Cached dishes or null
   */
  async getRestaurantDishes(placeId) {
    const key = `dishes:${placeId}`;
    return await this.get(key);
  }

  /**
   * Cache restaurant dishes
   * @param {string} placeId - Google Place ID
   * @param {Array} dishes - Dishes to cache
   * @returns {Promise<void>}
   */
  async setRestaurantDishes(placeId, dishes) {
    const key = `dishes:${placeId}`;
    await this.set(key, dishes, 86400); // 24 hours TTL
  }

  /**
   * Get restaurant reviews from cache
   * @param {string} placeId - Google Place ID
   * @returns {Promise<Array|null>} Cached reviews or null
   */
  async getRestaurantReviews(placeId) {
    const key = `reviews:${placeId}`;
    return await this.get(key);
  }

  /**
   * Cache restaurant reviews
   * @param {string} placeId - Google Place ID
   * @param {Array} reviews - Reviews to cache
   * @returns {Promise<void>}
   */
  async setRestaurantReviews(placeId, reviews) {
    const key = `reviews:${placeId}`;
    await this.set(key, reviews, 86400); // 24 hours TTL
  }

  /**
   * Clear all cache for a specific restaurant
   * @param {string} placeId - Google Place ID
   * @returns {Promise<void>}
   */
  async clearRestaurantCache(placeId) {
    const keys = [
      `restaurant:${placeId}`,
      `dishes:${placeId}`,
      `reviews:${placeId}`
    ];
    
    try {
      await this.redis.del(...keys);
      logger.info(`Cleared cache for restaurant: ${placeId}`);
    } catch (error) {
      logger.error('Cache clear error:', error);
    }
  }

  /**
   * Close Redis connection
   */
  async close() {
    try {
      await this.redis.quit();
      logger.info('Redis connection closed');
    } catch (error) {
      logger.error('Redis close error:', error);
    }
  }
}

module.exports = CacheService; 