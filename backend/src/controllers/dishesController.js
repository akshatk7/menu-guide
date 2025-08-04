const Joi = require('joi');
const GooglePlacesService = require('../services/googlePlacesService');
const AIService = require('../services/aiService');
const CacheService = require('../services/cacheService');
const logger = require('../utils/logger');

// Initialize services
const googlePlacesService = new GooglePlacesService();
const aiService = new AIService();
const cacheService = new CacheService();

// Validation schema
const getDishesSchema = Joi.object({
  place_id: Joi.string().required(),
});

/**
 * Get top dishes for a restaurant with AI analysis
 * @route POST /api/dishes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getRestaurantDishes = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = getDishesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Invalid request parameters',
        details: error.details[0].message
      });
    }

    const { place_id } = value;

    // Check cache first for dishes
    const cachedDishes = await cacheService.getRestaurantDishes(place_id);
    if (cachedDishes) {
      logger.info(`Returning cached dishes for restaurant: ${place_id}`);
      return res.json({
        success: true,
        data: cachedDishes,
        cached: true
      });
    }

    // Get restaurant details
    const restaurant = await googlePlacesService.getRestaurantDetails(place_id);
    
    // Check cache for reviews
    let reviews = await cacheService.getRestaurantReviews(place_id);
    if (!reviews) {
      // Get reviews from Google Places API
      reviews = await googlePlacesService.getRestaurantReviews(place_id);
      // Cache reviews
      await cacheService.setRestaurantReviews(place_id, reviews);
    }

    // Analyze reviews with AI to extract dishes
    const analyzedDishes = await aiService.analyzeReviewsForDishes(reviews, restaurant.name);

    // Get photos for each dish (using restaurant photos for now)
    const photos = await googlePlacesService.getPlacePhotos(place_id);

    // Format dishes with photos
    const dishesWithPhotos = analyzedDishes.map((dish, index) => ({
      name: dish.dish,
      score: dish.score,
      summary: dish.summary,
      images: photos.slice(index * 2, (index + 1) * 2) // Assign 2 photos per dish
    }));

    // Cache the results
    await cacheService.setRestaurantDishes(place_id, {
      restaurant: restaurant.name,
      top_dishes: dishesWithPhotos
    });

    res.json({
      success: true,
      data: {
        restaurant: restaurant.name,
        top_dishes: dishesWithPhotos
      },
      cached: false
    });

  } catch (error) {
    logger.error('Get dishes error:', error);
    
    // Handle specific error cases
    if (error.message.includes('not a restaurant')) {
      return res.status(400).json({
        error: 'Invalid restaurant selection',
        message: 'The selected place is not a restaurant. Please choose a restaurant.'
      });
    }

    res.status(500).json({
      error: 'Failed to get restaurant dishes',
      message: error.message
    });
  }
};

/**
 * Clear cache for a specific restaurant
 * @route DELETE /api/dishes/:place_id/cache
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const clearRestaurantCache = async (req, res) => {
  try {
    const { place_id } = req.params;
    
    if (!place_id) {
      return res.status(400).json({
        error: 'Place ID is required'
      });
    }

    await cacheService.clearRestaurantCache(place_id);

    res.json({
      success: true,
      message: 'Restaurant cache cleared successfully'
    });

  } catch (error) {
    logger.error('Clear cache error:', error);
    res.status(500).json({
      error: 'Failed to clear cache',
      message: error.message
    });
  }
};

module.exports = {
  getRestaurantDishes,
  clearRestaurantCache
}; 