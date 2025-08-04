const express = require('express');
const { getAutocompleteSuggestions } = require('../controllers/autocompleteController');

const router = express.Router();

/**
 * @route GET /api/autocomplete
 * @desc Get restaurant autocomplete suggestions
 * @access Public
 */
router.get('/', getAutocompleteSuggestions);

module.exports = router; 