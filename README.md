# Ud-studios-task

## Overview

**Ud-studios-task** is a full-stack web application that allows users to search for images, track their search history, and view the most popular search terms. The project demonstrates modern authentication, state management, and API integration using a robust tech stack with both backend and frontend layers.

## Features

- **User Authentication:** OAuth2 integration via Google, GitHub, and Facebook using Passport.js
- **Image Search:** Connects to the Unsplash API with dynamic query and pagination (20 results per page)
- **Search History:** Tracks user search activity and displays the search history
- **Top Searches:** Displays most frequently used search terms
- **Secure API:** Uses JWT-based authentication and secure cookies for user sessions
- **Frontend:** React app with Tailwind CSS for UI and React Router for navigation

## Technologies Used

### Backend (Node.js/Express)
- **Express.js:** Core server framework
- **MongoDB/Mongoose:** Database for users, search history, and top searches
- **Passport.js:** Strategy-based OAuth authentication (Google, GitHub, Facebook)
- **JWT (jsonwebtoken):** Secure authentication tokens and session management
- **Axios:** API requests to Unsplash
- **Helmet:** Security headers
- **CORS & Cookie-Parser:** HTTP security and session management

### Frontend (React)
- **React:** SPA with hooks for state and effect management
- **Tailwind CSS:** Modern styling and responsive design
- **Vite:** Build tooling & development server
- **React Router:** Client-side page navigation

## Project Structure

```
Ud-studios-task/
├── client/
│   ├── src/
│   │   ├── App.jsx        # Main routing & SPA component
│   │   ├── components/    # Home, Login, SearchBar, ImageCard, History, Banner
│   │   └── main.jsx       # React root entry
│   ├── package.json       # Frontend dependencies & scripts
│   └── vite.config.js     # Vite + Tailwind config
├── server/
│   ├── Index.js           # Express app entry & routing
│   ├── db.js              # MongoDB connection
│   ├── controllers/       # API logic: image search, history, top searches, auth
│   ├── routes/            # API route definitions
│   ├── models/            # Mongoose schemas for Login, User, Search history/data
│   ├── config/            # OAuth strategies (Google, GitHub, Facebook)
│   └── package.json       # Backend dependencies & scripts
└── README.md              # This file
```

## Setup Instructions

### Prerequisites

- Node.js & npm
- MongoDB instance (local or cloud)
- API keys:
  - Google, GitHub, Facebook OAuth credentials
  - Unsplash API key

### Installation

1. **Clone Repository**
   ```
   git clone https://github.com/Kjagadeeshkumarreddy/Ud-studios-task.git
   cd Ud-studios-task
   ```

2. **Install Backend**
   ```
   cd server
   npm install
   ```
   - Create `.env` with:
     ```
     PORT=5500
      MONGO_URL='mongodb+srv://jagadeeshreddykonda55_db_user:jagadeesh@cluster0.s3y180p.mongodb.net/?appName=Cluster0'
      JWT_KEY=abcd
      GOOGLE_CLIENT_ID=1073419478413-m3s44q7a2usm1jttuh3k24eqispc0b09.apps.googleusercontent.com
      GOOGLE_SECRET_KEY=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
      GITHUB_CLIENT_ID=Ov23liTLYpmBjcVYvNUJ
      GITHUB_SECRET_KEY=8d74d32e95dc1009ba3f91714930b7595b2b0df3
      FACEBOOK_APP_SECRET=668d9f6c232862248536a42e4307f815
      FACEBOOK_APP_ID=1210452611131261
      UNSPLASH_KEY=R-rWdtZdtlSa14_KW711Vyyivdi7EUKHxmSidx6oGL0
     ```

3. **Install Frontend**
   ```
   cd ../client
   npm install
   ```

4. **Run**
   - Start backend
     ```
     npm run dev        # or nodemon Index.js
     ```
   - Start frontend
     ```
     npm run dev
     ```

## Usage

- Open frontend at `http://localhost:5173`
- Login via Google, GitHub, or Facebook for authentication
- Search images using keywords (default: “nature”)
- View your search history and top search terms
  
## Routes or c urls

# Google Auth - Login
curl -X GET http://localhost:5500/api/auth/google

# Google Auth - Callback
curl -X GET http://localhost:5500/api/auth/google/callback

# Test Route
curl -X GET http://localhost:5500/api/test

# GitHub Auth - Login
curl -X GET http://localhost:5500/api/auth/github

# GitHub Auth - Callback
curl -X GET http://localhost:5500/api/auth/github/callback

# Facebook Auth - Login
curl -X GET http://localhost:5500/api/auth/facebook

# Facebook Auth - Callback
curl -X GET http://localhost:5500/api/auth/facebook/callback

# Get Images (POST) - example payload included
curl -X POST http://localhost:5500/api/get-images \
  -H "Content-Type: application/json" \
  -d '{"query":"nature","page":1,"perPage":20}'

# Get Max Search Data
curl -X GET http://localhost:5500/api/get-max-search

# Get History Data
curl -X GET http://localhost:5500/api/get-history


```

