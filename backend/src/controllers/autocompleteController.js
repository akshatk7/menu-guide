const Joi = require('joi');
const GooglePlacesService = require('../services/googlePlacesService');
const CacheService = require('../services/cacheService');
const logger = require('../utils/logger');

// Initialize services
const googlePlacesService = new GooglePlacesService();
const cacheService = new CacheService();

// Validation schema
const autocompleteSchema = Joi.object({
  query: Joi.string().min(2).max(100).required(),
  lat: Joi.number().min(-90).max(90).optional(),
  lng: Joi.number().min(-180).max(180).optional(),
});

/**
 * Get restaurant autocomplete suggestions
 * @route GET /api/autocomplete
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAutocompleteSuggestions = async (req, res) => {
  try {
    // Validate query parameters
    const { error, value } = autocompleteSchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        error: 'Invalid request parameters',
        details: error.details[0].message
      });
    }

    const { query, lat, lng } = value;

    // Check cache first
    const cachedSuggestions = await cacheService.getAutocompleteSuggestions(query);
    if (cachedSuggestions) {
      logger.info(`Returning cached autocomplete results for: "${query}"`);
      return res.json({
        success: true,
        data: cachedSuggestions,
        cached: true
      });
    }

    // Prepare location bias if coordinates provided
    const location = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;

    // Get suggestions from Google Places API
    const suggestions = await googlePlacesService.getAutocompleteSuggestions(query, location);

    // Cache the results
    await cacheService.setAutocompleteSuggestions(query, suggestions);

    res.json({
      success: true,
      data: suggestions,
      cached: false
    });

  } catch (error) {
    logger.error('Autocomplete error:', error);
    res.status(500).json({
      error: 'Failed to get restaurant suggestions',
      message: error.message
    });
  }
};

module.exports = {
  getAutocompleteSuggestions
}; 