# Multilingual FAQ API

## Overview
This project is a RESTful API for managing frequently asked questions (FAQs) with multilingual support. It allows users to create and retrieve FAQs in multiple languages using the `google-translate-api-x` package for translation. Redis is used for caching translated responses to improve performance.

## Project Structure
📂 bharatfd_proj2
├── node_modules           # Project dependencies
├── src                    # Source code
│   ├── 📂 config
│   │   ├── cache.js       # Redis configuration
│   │   ├── db.js          # MongoDB connection setup
│   ├── 📂 controllers
│   │   ├── faqController.js # FAQ CRUD logic and translations
│   ├── 📂 models
│   │   ├── faq.js         # Mongoose schema for FAQs
│   ├── 📂 routes
│   │   ├── faqRoutes.js   # Express routes for FAQs
│   ├── 📂 services
│   │   ├── translationServices.js # Google Translate API wrapper
│   ├── 📂 middleware
│   │   ├── errorHandler.js # Custom error handling middleware
├── index.js               # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── Dockerfile             # Docker environment configuration
├── package-lock.json      # Lock file for dependencies
└── README.md              # Project documentation

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/NITsush45/bharatfd_proj.git
   cd bharatfd_proj2
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```sh
   MONGO_URI="mongodb+srv://bharatfd_proj:bharatfd-projsush%4024@cluster0.bonyp.mongodb.net/?retryWrites=true&w=majority"
   REDIS_HOST="localhost"
   REDIS_PORT="6379"
   ```

4. **Start the server**
   ```sh
   npm run dev
   ```
   The API will be running on `http://localhost:8000`.

## API Usage

### 1. **Create an FAQ**
- **Endpoint:** `POST /api/faqs`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "question": "What is MongoDB?",
    "answer": "MongoDB is a NoSQL database."
  }
  ```
- **Response:**
  ```json
  {
    "_id": "679fcc971048b0b0757f4c5b",
    "question": "What is MongoDB?",
    "answer": "MongoDB is a NoSQL database.",
    "translations": {
      "hi": { "question": "MongoDB क्या है?", "answer": "MongoDB एक NoSQL डेटाबेस है।" },
      "bn": { "question": "MongoDB কি?", "answer": "MongoDB একটি NoSQL ডাটাবেস।" }
    },
    "createdAt": "2025-02-02T19:50:47.833Z"
  }
  ```

### 2. **Get FAQs (with optional language translation)**
- **Endpoint:** `GET /api/faqs?lang=bn`
- **Response:**
  ```json
  [
    {
      "question": "MongoDB কি?",
      "answer": "MongoDB একটি NoSQL ডাটাবেস।"
    }
  ]
  ```
###Testing with Postman
Open Postman.
Create a new POST request to http://localhost:8000/api/faqs.
Set the Body to raw JSON and insert the payload above.
Click Send and verify the response.

## Git & Version Control
- Use meaningful commit messages:
  - `feat: Add multilingual FAQ model`
  - `fix: Improve translation caching`
  - `docs: Update README with API examples`
- Ensure atomic commits with clear commit messages.
Contact
For any inquiries, reach out to us at:
📧 sushiitantmi45.gmailcom
