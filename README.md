# AI Travel Planner Backend

Backend API for the AI Travel Planner application. This service provides user authentication, AI-powered itinerary generation, trip management, and itinerary regeneration using Groq AI.

---

# 🚀 Features

* User Registration & Login
* JWT Authentication
* Access Token & Refresh Token Support
* AI-Powered Travel Itinerary Generation
* Day-wise Itinerary Regeneration
* Trip History Management
* Protected Routes
* MongoDB Database Integration
* Groq LLM Integration
* RESTful API Architecture
* Secure Password Hashing with bcrypt

---

# 🏗️ Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Tokens)
* bcrypt

## AI

* Groq API
* llama-3.3-70b-versatile

---

# 📂 Project Structure

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── prompts/
│   ├── utils/
│   └── validators/
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

# 🔐 Authentication Flow

## Register / Login

Server returns:

```json
{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

### Token Expiry

| Token         | Expiry     |
| ------------- | ---------- |
| Access Token  | 15 Minutes |
| Refresh Token | 7 Days     |

---

## Protected Routes

Client sends:

```http
Authorization: Bearer <accessToken>
```

with every authenticated request.

---

## Refresh Token Flow

When access token expires:

```http
POST /api/v1/auth/refresh
```

Request:

```json
{
  "refreshToken": "your_refresh_token"
}
```

Response:

```json
{
  "accessToken": "new_access_token"
}
```

---

# 🤖 AI Architecture

## Model Used

**llama-3.3-70b-versatile**

---

## AI Workflow

* Single AI request generates:

  * Complete itinerary
  * Budget estimation
  * Hotel recommendations
* Strict JSON response format
* Automatic JSON validation
* Error handling for malformed responses
* Separate prompt for itinerary regeneration

---

## Itinerary Generation Flow

```text
User Input
(destination, days, budget, interests)
        │
        ▼
buildItineraryPrompt()
        │
        ▼
Groq API
        │
        ▼
JSON Validation
        │
        ▼
Save to MongoDB
        │
        ▼
Return Response
```

---

## Day Regeneration Flow

```text
User Requests Regeneration
        │
        ▼
buildRegenerateDayPrompt()
        │
        ▼
Groq API
        │
        ▼
JSON Validation
        │
        ▼
Update MongoDB
        │
        ▼
Return Updated Day
```

---

# 📡 API Endpoints

## Authentication

### Register

```http
POST /api/v1/auth/register
```

### Login

```http
POST /api/v1/auth/login
```

### Refresh Token

```http
POST /api/v1/auth/refresh
```

### Logout

```http
POST /api/v1/auth/logout
```

---

## Trips

### Generate Trip

```http
POST /api/v1/trips
```

### Get All Trips

```http
GET /api/v1/trips
```

### Get Trip By ID

```http
GET /api/v1/trips/:id
```

### Delete Trip

```http
DELETE /api/v1/trips/:id
```

### Regenerate Day

```http
PATCH /api/v1/trips/:tripId/regenerate-day
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
MONGODB_URI=your_mongodb_uri

GROQ_API_KEY=your_groq_api_key

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

PORT=4000

FRONTEND_URL=http://localhost:3000
```

---

# 🛠️ Installation

## 1. Clone Repository

```bash
git clone <repository_url>
```

## 2. Navigate to Project

```bash
cd backend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create `.env`

```env
MONGODB_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_api_key
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
PORT=4000
FRONTEND_URL=http://localhost:3000
```

---

# ▶️ Running the Application

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

---

# ❤️ Health Check

```http
GET /health
```

Response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

---

# 🌍 Deployment (Render)

## Step 1

Push code to GitHub.

## Step 2

Create a new Web Service in Render.

## Step 3

Connect GitHub Repository.

## Step 4

Configure Service

```text
Name: ai-trip-planner-backend
Environment: Node
Build Command: npm install
Start Command: node server.js
```

## Step 5

Add Environment Variables

```env
MONGODB_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_api_key
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
PORT=4000
FRONTEND_URL=https://your-frontend.vercel.app
```

## Step 6

Deploy.

---

# 🛡️ Security

* bcrypt password hashing (12 rounds)
* JWT Authentication
* Protected Routes
* Refresh Token Mechanism
* User-specific Data Isolation
* Environment Variable Protection
* CORS Restrictions
* Input Validation
* Error Handling Middleware

---

# ⚖️ Design Decisions

| Decision             | Reason                       |
| -------------------- | ---------------------------- |
| Groq                 | Fast inference and free tier |
| MongoDB              | Flexible itinerary schema    |
| JWT                  | Stateless authentication     |
| Layered Architecture | Better maintainability       |
| Single AI Call       | Reduced latency              |
| User Isolation       | Security and privacy         |

---

# ⚠️ Known Limitations

* Groq free tier rate limits
* No real-time hotel booking integration
* No payment gateway integration
* Refresh tokens not persisted for revocation
* No email verification
* No social login support

---

# 👨‍💻 Author

**Prathviraj Gowda**

LinkedIn: https://linkedin.com/in/prathviraj-gowda

GitHub: https://github.com/gPrathvi

---


