# Cine-Stream

Cine-Stream is a modern, responsive React Single Page Application (SPA) designed to let users explore popular movies, search the TMDB database, and use an AI-powered mood matcher to find the perfect film.

## Features

- **TMDB API Integration**: Fetches real-time popular movies and search results directly from The Movie Database (TMDB).
- **Infinite Scroll**: Utilizes the native `IntersectionObserver` API for seamless, performant infinite scrolling without heavy external libraries.
- **AI Mood Matcher**: Powered by Google Gemini 1.5 Flash. Type how you are feeling (e.g., "I'm sad but want an action movie"), and the AI will recommend a movie and automatically trigger a search for it.
- **State Persistence (Favorites)**: Users can favorite movies by clicking the heart icon. Favorites are saved in the browser's `localStorage` and persist across page reloads.
- **Debounced Search**: Optimized network requests ensure TMDB is only queried after the user has stopped typing.
- **Asset Lazy Loading**: Movie posters are lazy-loaded natively via HTML5 `loading="lazy"` for rapid initial page rendering.
- **Responsive Design**: Includes a custom mobile-first layout that shifts the search bar dynamically based on screen size.

## Technologies Used

- **React 18** (Hooks: `useState`, `useEffect`, `useRef`)
- **Vite** (Build tool)
- **Vanilla CSS** (Custom CSS variables, Flexbox, CSS Grid)
- **Google Gen AI SDK** (`@google/genai`)
- **React Icons** (`react-icons`)

## Setup Instructions

1. **Clone the repository** and open the project directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Create a `.env` file in the root of your project and add your API keys:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** and navigate to `http://localhost:5173`.
