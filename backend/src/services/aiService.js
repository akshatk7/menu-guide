const OpenAI = require('openai');
const logger = require('../utils/logger');

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
  }

  /**
   * Analyze restaurant reviews to extract dish information
   * @param {Array} reviews - Array of review objects
   * @param {string} restaurantName - Name of the restaurant
   * @returns {Promise<Array>} Array of dish objects with scores and summaries
   */
  async analyzeReviewsForDishes(reviews, restaurantName) {
    try {
      if (!reviews || reviews.length === 0) {
        logger.warn('No reviews provided for analysis');
        return [];
      }

      // Prepare reviews text for analysis
      const reviewsText = reviews.map(review => 
        `Review: ${review.text}\nRating: ${review.rating}/5\nTime: ${new Date(review.time * 1000).toISOString()}`
      ).join('\n\n');

      const prompt = `You are a food critic analyzing reviews for "${restaurantName}". 

TASK: Extract all dish names mentioned in the reviews and analyze their popularity.

REVIEWS:
${reviewsText}

INSTRUCTIONS:
1. Identify all unique dish names mentioned in the reviews
2. Count how many positive mentions each dish gets (positive = rating 4-5 stars or positive language)
3. For each dish, write a friendly, one-sentence summary of why people like it
4. Only include dishes that have at least 2 positive mentions
5. Sort by number of positive mentions (highest first)

OUTPUT FORMAT (JSON array):
[
  {
    "dish": "Exact dish name as mentioned",
    "positive_mentions": number,
    "summary": "One sentence summary of why people like this dish"
  }
]

IMPORTANT:
- Use exact dish names as mentioned in reviews
- Only count positive mentions (4-5 star ratings or positive language)
- Write friendly, appetizing summaries
- Return valid JSON only
- Limit to top 10 dishes maximum`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful food critic assistant. Always respond with valid JSON arrays.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      const content = response.choices[0].message.content;
      
      // Parse the JSON response
      let dishes;
      try {
        dishes = JSON.parse(content);
      } catch (parseError) {
        logger.error('Failed to parse AI response:', parseError);
        throw new Error('Failed to analyze reviews');
      }

      // Validate and clean the response
      const validDishes = dishes.filter(dish => 
        dish.dish && 
        typeof dish.positive_mentions === 'number' && 
        dish.summary
      );

      // Normalize scores to 1-10 scale
      const maxMentions = Math.max(...validDishes.map(d => d.positive_mentions), 1);
      const normalizedDishes = validDishes.map(dish => ({
        ...dish,
        score: Math.round((dish.positive_mentions / maxMentions) * 10 * 10) / 10 // Round to 1 decimal
      }));

      logger.info(`AI analysis found ${normalizedDishes.length} dishes for ${restaurantName}`);
      return normalizedDishes;

    } catch (error) {
      logger.error('Error in analyzeReviewsForDishes:', error);
      throw new Error('Failed to analyze restaurant reviews');
    }
  }

  /**
   * Generate a summary for a specific dish
   * @param {string} dishName - Name of the dish
   * @param {Array} reviews - Array of reviews mentioning this dish
   * @returns {Promise<string>} Summary of the dish
   */
  async generateDishSummary(dishName, reviews) {
    try {
      const reviewsText = reviews.map(review => review.text).join('\n');

      const prompt = `Analyze these restaurant reviews that mention "${dishName}" and write a friendly, appetizing one-sentence summary of why people like this dish.

Reviews mentioning "${dishName}":
${reviewsText}

Write a single sentence that captures why people enjoy this dish. Make it appetizing and positive.`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful food critic assistant. Write appetizing, positive summaries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
      });

      return response.choices[0].message.content.trim();

    } catch (error) {
      logger.error('Error in generateDishSummary:', error);
      return `Delicious ${dishName} that customers love.`;
    }
  }
}

module.exports = AIService; 