# What Should I Order? - Backend API

A production-grade Node.js backend for AI-powered restaurant dish recommendations using Google Places API and OpenAI.

## 🚀 Features

- **Restaurant Search**: Google Places Autocomplete API integration
- **AI Analysis**: OpenAI GPT-4o for analyzing restaurant reviews
- **Smart Caching**: Redis-based caching to reduce API calls
- **Security**: Rate limiting, input validation, and security headers
- **Scalable**: Production-ready architecture with proper error handling

## 🏗️ Architecture

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utilities (logger, etc.)
│   ├── config/          # Configuration
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── logs/               # Application logs
└── .env.example        # Environment variables template
```

## 📋 Prerequisites

- Node.js 18+ 
- Redis (optional, for caching)
- Google Maps API key
- OpenAI API key

## 🛠️ Installation

1. **Clone and install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Required API Keys:**
   - `GOOGLE_MAPS_API_KEY`: Google Maps API key with Places API enabled
   - `OPENAI_API_KEY`: OpenAI API key for GPT-4o access

## 🚀 Running the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server runs on `http://localhost:3001` by default.

## 📡 API Endpoints

### Autocomplete
```
GET /api/autocomplete?query=restaurant_name&lat=40.7128&lng=-74.0060
```
Returns restaurant suggestions from Google Places API.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "place_id": "ChIJ...",
      "name": "Restaurant Name",
      "address": "123 Main St, City, State",
      "types": ["restaurant", "food", "establishment"]
    }
  ],
  "cached": false
}
```

### Get Restaurant Dishes
```
POST /api/dishes
Content-Type: application/json

{
  "place_id": "ChIJ..."
}
```
Returns AI-analyzed top dishes with scores and summaries.

**Response:**
```json
{
  "success": true,
  "data": {
    "restaurant": "Restaurant Name",
    "top_dishes": [
      {
        "name": "Dish Name",
        "score": 8.7,
        "summary": "Delicious description of why people love this dish.",
        "images": [
          "https://maps.googleapis.com/...",
          "https://maps.googleapis.com/..."
        ]
      }
    ]
  },
  "cached": false
}
```

### Health Check
```
GET /health
```
Returns server status and uptime information.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | `development` |
| `PORT` | Server port | `3001` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:8081` |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key | Required |
| `OPENAI_API_KEY` | OpenAI API key | Required |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis password | Optional |
| `LOG_LEVEL` | Logging level | `info` |

### Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Headers**: Standard rate limit headers included

## 🧠 AI Analysis

The backend uses OpenAI GPT-4o to analyze restaurant reviews and:

1. **Extract dish names** mentioned in reviews
2. **Count positive mentions** (4-5 star ratings or positive language)
3. **Generate summaries** explaining why people like each dish
4. **Score dishes** on a 1-10 scale based on popularity
5. **Return top 5-10 dishes** sorted by popularity

## 💾 Caching Strategy

- **Autocomplete**: 30 minutes TTL
- **Restaurant Details**: 2 hours TTL
- **Reviews**: 24 hours TTL
- **Dishes Analysis**: 24 hours TTL

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Configured for frontend
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Joi schema validation
- **Error Handling**: Graceful error responses
- **Logging**: Winston-based structured logging

## 📊 Monitoring

- **Health Check**: `/health` endpoint
- **Structured Logging**: Winston with JSON format
- **Error Tracking**: Comprehensive error logging
- **Performance**: Request/response logging with Morgan

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**: Set all required API keys
2. **Redis**: Configure Redis for caching (optional but recommended)
3. **Logging**: Configure log rotation and monitoring
4. **Process Manager**: Use PM2 or similar for production
5. **SSL**: Configure HTTPS in production
6. **Monitoring**: Set up application monitoring

### Example PM2 Configuration

```json
{
  "name": "what-should-i-order-api",
  "script": "src/server.js",
  "instances": "max",
  "exec_mode": "cluster",
  "env": {
    "NODE_ENV": "production",
    "PORT": 3001
  }
}
```

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write comprehensive logging
5. Test all endpoints

## 📝 License

ISC License 