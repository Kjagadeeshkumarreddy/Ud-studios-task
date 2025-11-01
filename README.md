# 🖼️ React + Node.js Image Search App

This full-stack application allows users to search for images using the Unsplash API. It features a React frontend and a Node.js/Express backend with OAuth authentication via Google, GitHub, and Facebook.

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/image-search-app.git
cd image-search-app
2. Install Dependencies
Backend
bash
cd server
npm install
Frontend
bash
cd ../client
npm install
3. Create .env Files
📦 Backend (server/.env)
env
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
UNSPLASH_SECRET_KEY=your_unsplash_secret_key
OAUTH_CLIENT_ID=your_oauth_client_id
OAUTH_CLIENT_SECRET=your_oauth_client_secret
REDIRECT_URI=http://localhost:5000/auth/google/callback
PORT=5000
🌐 Frontend (client/.env)
env
REACT_APP_API_BASE_URL=http://localhost:5000
4. Run the App
Start Backend
bash
cd server
npm run dev
Start Frontend
bash
cd ../client
npm start
📁 Folder Structure
Code
image-search-app/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level components
│   │   └── App.js
│   └── public/
├── server/               # Node.js backend
│   ├── routes/           # Express route definitions
│   ├── controllers/      # Business logic for each route
│   ├── utils/            # Helper functions
│   └── index.js
├── README.md
└── .gitignore
📡 API Routes Overview
These are the backend routes defined in your Express server. They handle authentication flows, image search, and user history tracking.

🔐 Authentication Routes
Method	Endpoint	Description
GET	/auth/google	Initiates Google OAuth login
GET	/auth/google/callback	Handles Google OAuth callback
GET	/auth/github	Initiates GitHub OAuth login
GET	/auth/github/callback	Handles GitHub OAuth callback
GET	/auth/facebook	Initiates Facebook OAuth login
GET	/auth/facebook/callback	Handles Facebook OAuth callback
🖼️ Image & Search Routes
Method	Endpoint	Description
POST	/get-images	Fetches images from Unsplash API
GET	/get-max-search	Returns most frequently searched term
GET	/get-history	Retrieves user search history
🧪 Test Route
Method	Endpoint	Description
GET	/test	Simple test route
📬 Postman Collection (Sample)
You can import this Postman collection to test all endpoints:

json
{
  "info": {
    "name": "Image Search API",
    "_postman_id": "your-id",
    "description": "Test endpoints for Unsplash image search and OAuth",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Search Images",
      "request": {
        "method": "POST",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/get-images",
          "host": ["localhost"],
          "port": "5000",
          "path": ["get-images"]
        },
        "body": {
          "mode": "raw",
          "raw": "{ \"query\": \"nature\" }"
        }
      }
    },
    {
      "name": "Google Login",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:5000/auth/google",
          "host": ["localhost"],
          "port": "5000",
          "path": ["auth", "google"]
        }
      }
    }
  ]
}
🧠 Controllers Used
These routes are powered by the following controller files:

GoogleAuthControllers.js

GitHubAuthController.js

FaceBookLoginControllers.js

GetImageController.js

getMaxSearchData.js

GetHistoryController.js

Each controller contains the logic for handling its respective route.

📄 License
This project is licensed under the MIT License.
