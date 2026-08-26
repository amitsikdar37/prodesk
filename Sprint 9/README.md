# The Data Hub 🚀 (RESTful API Server)

A robust backend RESTful API server built with **Node.js** and **Express**, engineered to handle data pipelines, full CRUD operations, custom middleware logging, and mock JWT authentication.

---

## 📌 Features

- ⚡ **Express Server**: Fast, lightweight HTTP server listening on port `5000`.
- 🔄 **Full CRUD Logic**: Create, Read, Update, and Delete operations for blog posts.
- 💾 **In-Memory Database**: Ephemeral state management for rapid prototyping.
- 🛠️ **Custom Logger Middleware**: Intercepts every incoming request and logs `[METHOD] URL - TIMESTAMP`.
- 🔐 **Mock Authentication**: `/login` endpoint supporting credential validation and mock JWT issuance.
- 🔄 **Hot Reloading**: Integrated development workflow using `nodemon`.

---

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Development Tool:** [Nodemon](https://nodemon.io/)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

### 2. Installation
Clone or navigate to the project directory and install dependencies:
```bash
npm install
```

### 3. Running the Server

- **Development Mode (with auto-reload):**
  ```bash
  npm run dev
  ```

- **Production Mode:**
  ```bash
  npm start
  ```

The server will start listening at: `http://localhost:5000`

---

## 📡 API Reference & Endpoints

### 📝 Blog Posts Resource (`/posts`)

| Method | Endpoint | Description | Success Code | Error Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/posts` | Retrieve all blog posts | `200 OK` | - |
| **GET** | `/posts/:id` | Retrieve a single post by ID | `200 OK` | `404 Not Found` |
| **POST** | `/posts` | Create a new blog post | `201 Created` | `400 Bad Request` |
| **PUT** | `/posts/:id` | Update an existing post by ID | `200 OK` | `404 Not Found` |
| **DELETE** | `/posts/:id` | Delete a post by ID | `200 OK` | `404 Not Found` |

#### Example: Create Post (`POST /posts`)
**Request Body:**
```json
{
  "title": "Mastering Express",
  "content": "A guide to building scalable REST APIs."
}
```
**Response (`201 Created`):**
```json
{
  "message": "Post created successfully"
}
```

---

### 🔐 Authentication Resource (`/login`)

| Method | Endpoint | Description | Success Code | Error Code |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/login` | Authenticate user & return JWT | `200 OK` | `400 Bad Request` |

#### Example: Login (`POST /login`)
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
**Response (`200 OK`):**
```json
{
  "message": "Login successful",
  "token": "mock-jwt-token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xyz123"
}
```

---

## ⚙️ Middleware Overview

Every incoming request passes through the custom logger middleware:
```
[GET] /posts - 4:21:02 PM
[POST] /login - 4:21:15 PM
[PUT] /posts/1 - 4:22:00 PM
```
It extracts the **HTTP Method**, **URL path**, and **Local Timestamp** before passing execution to the next route handler via `next()`.
