# Sprint 11: Fullstack System Integration (MERN Pipeline)

This project integrates a React/Vite Single Page Application with a Node.js/Express/MongoDB REST API into a unified full-stack application pipeline.

---

## 📌 Phase 1 Highlights

- **Network Connection**: React frontend is hydrated with local Node.js API endpoints (`http://localhost:5000/api/posts`).
- **Data Fetching**: Uses React `useEffect` to execute GET requests to the backend database and render the payloads immediately.
- **CORS Resolution**: Configured the `cors` middleware package in Express to authorize requests originating from Vite's development server (`http://localhost:5173`).
- **Database & Resilience**: Integrated Mongoose with MongoDB and an in-memory fallback mechanism to ensure continuous functionality even during offline testing.

---

## 📁 Directory Structure

```text
Sprint 11/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── server/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── models/
│       └── Post.js
├── package.json
├── prompts.md
└── README.md
```

---

## 🚀 Getting Started

### 1. Server Setup

Navigate to the `server` directory and start the Express server:

```bash
cd server
npm install
npm run dev
```

The server starts on `http://localhost:5000`.

### 2. Client Setup

In a separate terminal, navigate to the `client` directory and start the Vite dev server:

```bash
cd client
npm install
npm run dev
```

The client application will run at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/posts` | Fetch all posts from the database |
| `POST` | `/api/posts` | Create a new blog post |
| `DELETE` | `/api/posts/:id` | Delete a post by ID |
| `GET` | `/api/health` | Health check & database connection status |

---

## 🛡️ CORS Configuration

In `server/index.js`, the CORS middleware is installed and configured as follows:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
```

This prevents the browser from throwing a Cross-Origin Resource Sharing block when the React client on port `5173` communicates with the Express server on port `5000`.
