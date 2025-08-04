const express = require('express');
const { getRestaurantDishes, clearRestaurantCache } = require('../controllers/dishesController');

const router = express.Router();

/**
 * @route POST /api/dishes
 * @desc Get top dishes for a restaurant with AI analysis
 * @access Public
 */
router.post('/', getRestaurantDishes);

/**
 * @route DELETE /api/dishes/:place_id/cache
 * @desc Clear cache for a specific restaurant
 * @access Public
 */
router.delete('/:place_id/cache', clearRestaurantCache);

module.exports = router; 