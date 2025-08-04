# What Should I Order? 🍴

An AI-powered restaurant dish recommendation app that helps you discover the best dishes at any restaurant using Google Places API and OpenAI analysis.

## 🚀 Features

- **Smart Restaurant Search**: Google Places Autocomplete API integration
- **AI-Powered Analysis**: OpenAI GPT-4o analyzes restaurant reviews to find top dishes
- **Dish Recommendations**: Get personalized dish suggestions with scores and summaries
- **Clean UI**: Modern, responsive interface built with React and Tailwind CSS
- **Production Ready**: Scalable backend with caching, security, and monitoring

## 🏗️ Architecture

```
menu-guide/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # UI components
│   ├── pages/             # Page components
│   └── ...
├── backend/               # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   └── ...
│   └── ...
└── ...
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for components

### Backend
- **Node.js** with Express
- **Google Places API** for restaurant search
- **OpenAI GPT-4o** for AI analysis
- **Redis** for caching
- **Winston** for logging

## 🚀 Quick Start

### Frontend Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8081` to see the app.

### Backend Development

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API keys to .env

# Start development server
npm run dev
```

The backend runs on `http://localhost:3001`.

## 🔑 Required API Keys

To use the full functionality, you'll need:

1. **Google Maps API Key**
   - Enable Places API
   - Add to `backend/.env` as `GOOGLE_MAPS_API_KEY`

2. **OpenAI API Key**
   - Get from OpenAI platform
   - Add to `backend/.env` as `OPENAI_API_KEY`

## 📡 API Endpoints

### Frontend
- Search for restaurants and get dish recommendations
- Clean, responsive interface
- Real-time search suggestions

### Backend
- `GET /api/autocomplete` - Restaurant search suggestions
- `POST /api/dishes` - Get AI-analyzed top dishes
- `GET /health` - Health check endpoint

## 🧠 How It Works

1. **Search**: User searches for a restaurant
2. **Autocomplete**: Google Places API provides restaurant suggestions
3. **Selection**: User selects a restaurant
4. **Analysis**: Backend fetches Google reviews and analyzes with AI
5. **Results**: Returns top dishes with scores and summaries

## 🔒 Security Features

- Rate limiting (100 req/15min per IP)
- Input validation with Joi
- Security headers with Helmet
- CORS configuration
- Comprehensive error handling

## 📊 Performance

- Redis caching for API responses
- Optimized database queries
- Efficient AI prompt engineering
- Production-ready logging

## 🚀 Deployment

### Frontend
Deploy to Vercel, Netlify, or any static hosting service.

### Backend
Deploy to Railway, Render, or any Node.js hosting service.

## 📝 License

ISC License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ using modern web technologies
