const { Client } = require('@googlemaps/google-maps-services-js');
const logger = require('../utils/logger');

class GooglePlacesService {
  constructor() {
    this.client = new Client({});
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!this.apiKey) {
      throw new Error('GOOGLE_MAPS_API_KEY environment variable is required');
    }
  }

  /**
   * Get restaurant autocomplete suggestions
   * @param {string} query - Search query
   * @param {Object} location - Optional location bias
   * @returns {Promise<Array>} Array of restaurant suggestions
   */
  async getAutocompleteSuggestions(query, location = null) {
    try {
      const request = {
        params: {
          input: query,
          key: this.apiKey,
          types: 'restaurant', // Only restaurants
          components: 'country:us', // Restrict to US for now
        }
      };

      // Add location bias if provided
      if (location) {
        request.params.location = `${location.lat},${location.lng}`;
        request.params.radius = 50000; // 50km radius
      }

      const response = await this.client.placeAutocomplete(request);
      
      if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      const suggestions = response.data.predictions.map(prediction => ({
        place_id: prediction.place_id,
        name: prediction.structured_formatting.main_text,
        address: prediction.structured_formatting.secondary_text,
        types: prediction.types
      }));

      logger.info(`Autocomplete returned ${suggestions.length} suggestions for query: "${query}"`);
      return suggestions;

    } catch (error) {
      logger.error('Error in getAutocompleteSuggestions:', error);
      throw new Error('Failed to get restaurant suggestions');
    }
  }

  /**
   * Get detailed restaurant information
   * @param {string} placeId - Google Place ID
   * @returns {Promise<Object>} Restaurant details
   */
  async getRestaurantDetails(placeId) {
    try {
      const request = {
        params: {
          place_id: placeId,
          key: this.apiKey,
          fields: ['name', 'formatted_address', 'types', 'business_status', 'rating', 'user_ratings_total', 'photos']
        }
      };

      const response = await this.client.placeDetails(request);
      
      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      const place = response.data.result;
      
      // Verify it's a restaurant
      if (!place.types.includes('restaurant') && !place.types.includes('food')) {
        throw new Error('Selected place is not a restaurant');
      }

      const restaurant = {
        place_id: placeId,
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        total_ratings: place.user_ratings_total,
        business_status: place.business_status,
        photos: place.photos ? place.photos.slice(0, 5) : [] // Limit to 5 photos
      };

      logger.info(`Retrieved details for restaurant: ${restaurant.name}`);
      return restaurant;

    } catch (error) {
      logger.error('Error in getRestaurantDetails:', error);
      throw new Error('Failed to get restaurant details');
    }
  }

  /**
   * Get restaurant reviews
   * @param {string} placeId - Google Place ID
   * @returns {Promise<Array>} Array of reviews
   */
  async getRestaurantReviews(placeId) {
    try {
      const request = {
        params: {
          place_id: placeId,
          key: this.apiKey,
          fields: ['reviews']
        }
      };

      const response = await this.client.placeDetails(request);
      
      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      const reviews = response.data.result.reviews || [];
      
      // Filter reviews from last 12 months
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      const recentReviews = reviews.filter(review => {
        const reviewDate = new Date(review.time * 1000);
        return reviewDate >= oneYearAgo;
      });

      logger.info(`Retrieved ${recentReviews.length} recent reviews for place: ${placeId}`);
      return recentReviews;

    } catch (error) {
      logger.error('Error in getRestaurantReviews:', error);
      throw new Error('Failed to get restaurant reviews');
    }
  }

  /**
   * Get photo URLs for a place
   * @param {string} placeId - Google Place ID
   * @returns {Promise<Array>} Array of photo URLs
   */
  async getPlacePhotos(placeId) {
    try {
      const request = {
        params: {
          place_id: placeId,
          key: this.apiKey,
          fields: ['photos']
        }
      };

      const response = await this.client.placeDetails(request);
      
      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      const photos = response.data.result.photos || [];
      
      // Convert photo references to URLs
      const photoUrls = photos.slice(0, 10).map(photo => {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${this.apiKey}`;
      });

      logger.info(`Retrieved ${photoUrls.length} photos for place: ${placeId}`);
      return photoUrls;

    } catch (error) {
      logger.error('Error in getPlacePhotos:', error);
      return []; // Return empty array if photos fail
    }
  }
}

module.exports = GooglePlacesService; 