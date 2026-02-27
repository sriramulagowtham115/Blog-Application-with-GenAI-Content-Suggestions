🖋 Inkwell — AI-Powered Blog Platform

Live Demo: https://blog-application-with-gen-ai-conten.vercel.app/

GitHub Repo: https://github.com/sriramulagowtham115/Blog-Application-with-GenAI-Content-Suggestions


A full-stack blog application built with React, Node.js, Express, and SQLite, featuring AI-powered content suggestions to help users generate related topics and introductory paragraphs while writing posts.
🚀 Live Features

📝 Create, edit, and delete blog posts

📚 View blog list with previews

📖 Read full blog details

🤖 AI-powered topic & intro suggestions

💾 SQLite database integration

🎨 Clean, modern UI inspired by editorial platforms

🧠 Tech Stack
Frontend

React.js

React Router

Axios

Custom CSS (Inkwell theme)

Backend

Node.js

Express.js

SQLite (better-sqlite3)

AI Layer

Backend AI abstraction endpoint

Structured for integration with OpenAI / Gemini / Claude / Mistral

Dynamic suggestion generation

📁 Project Structure
ajackus-blog-app/
│
├── backend/
│   ├── routes/
│   │   ├── blogs.js
│   │   └── ai.js
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
⚙ Backend API Endpoints
Blog APIs
Method	Endpoint	Description
POST	/api/blogs	Create blog
GET	/api/blogs	Get all blogs
GET	/api/blogs/:id	Get single blog
PUT	/api/blogs/:id	Update blog
DELETE	/api/blogs/:id	Delete blog
🤖 AI Suggestions API

POST /api/ai-suggestions

Request:
{
  "title": "How to build a web app",
  "content": "Introduction to building web applications..."
}
Response:
{
  "suggestions": {
    "topics": [
      "Future trends in web development",
      "Common mistakes in web app architecture"
    ],
    "intro": "Building web applications requires understanding..."
  }
}
🗄 Database Schema
Blogs Table
Column	Type
id	INTEGER (Primary Key)
title	TEXT
content	TEXT
author	TEXT
created_at	DATETIME
updated_at	DATETIME
🔧 Setup Instructions
1️⃣ Clone Repository
git clone   (https://github.com/sriramulagowtham115/Blog-Application-with-GenAI-Content-Suggestions)
cd ajackus-blog-app
2️⃣ Backend Setup
cd backend
npm install
npm run dev

Server runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
🧠 AI Architecture

The AI feature is implemented through a backend abstraction layer:

Frontend sends user input to /api/ai-suggestions

Backend processes the prompt

Returns structured topic & intro suggestions

Designed to plug into external LLM providers

This architecture allows easy integration with:

OpenAI

Gemini

Claude

Mistral

🎯 Key Design Decisions

Separation of concerns (Frontend / Backend)

Clean RESTful API structure

Modular route handling

Scalable AI abstraction layer

Lightweight SQLite for local persistence

🌟 Future Improvements

User authentication (JWT)

Markdown rendering

Comment system

Deployment to Render / Railway

Real-time AI provider integration

👨‍💻 Author

Sriramula Gowtham
Full Stack Developer | React | Node | AI Integration

