/**
 * Cine-Stream — App Shell (Presentational)
 *
 * This file wires the presentational components together with
 * DEMO data so you can visually verify the layout.
 *
 * 🔑  Replace the demo state + handlers below with your own
 *     useState / useEffect / data-fetching logic.
 */
import { useRef, useState } from 'react';
import { Header, SearchBar, MediaGrid, FavoritesView } from './components';
import './App.css';

/* ──────────────────────────────────────────────
   DEMO DATA — DELETE when real API is connected
   ────────────────────────────────────────────── */
const DEMO_MOVIES = [
  { id: 1,  title: 'Inception',                  year: '2010', rating: 8.8, posterUrl: 'https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',    isFavorite: false },
  { id: 2,  title: 'The Dark Knight',            year: '2008', rating: 9.0, posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911BytUr46MtIut.jpg',    isFavorite: true  },
  { id: 3,  title: 'Interstellar',               year: '2014', rating: 8.7, posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',    isFavorite: false },
  { id: 4,  title: 'Parasite',                   year: '2019', rating: 8.5, posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',    isFavorite: true  },
  { id: 5,  title: 'Pulp Fiction',               year: '1994', rating: 8.9, posterUrl: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',    isFavorite: false },
  { id: 6,  title: 'The Shawshank Redemption',   year: '1994', rating: 9.3, posterUrl: 'https://image.tmdb.org/t/p/w500/9cjIGRjkrr9fDHKRDV3ZCAG7hWx.jpg',    isFavorite: false },
  { id: 7,  title: 'Fight Club',                 year: '1999', rating: 8.8, posterUrl: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',    isFavorite: false },
  { id: 8,  title: 'The Matrix',                 year: '1999', rating: 8.7, posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',    isFavorite: false },
  { id: 9,  title: 'Spirited Away',              year: '2001', rating: 8.6, posterUrl: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',    isFavorite: true  },
  { id: 10, title: 'Whiplash',                   year: '2014', rating: 8.5, posterUrl: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',    isFavorite: false },
  { id: 11, title: 'The Godfather',              year: '1972', rating: 9.2, posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',    isFavorite: false },
  { id: 12, title: 'Blade Runner 2049',          year: '2017', rating: 8.0, posterUrl: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',    isFavorite: false },
];

export default function App() {
  /* ──────────────────────────────────────────
     ⚠️  TEMPORARY demo state — you will replace
         everything below with your own hooks.
     ────────────────────────────────────────── */
  const [view, setView] = useState('browse');
  const [movies, setMovies] = useState(DEMO_MOVIES);
  const [query, setQuery] = useState('');
  const [moodQuery, setMoodQuery] = useState('');

  // Ref for the IntersectionObserver sentinel
  const sentinelRef = useRef(null);

  const handleToggleFavorite = (movie) => {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movie.id ? { ...m, isFavorite: !m.isFavorite } : m,
      ),
    );
  };

  const favorites = movies.filter((m) => m.isFavorite);
  /* ────────── END DEMO STATE ────────── */

  return (
    <div className="cs-app">
      {/* ── Header ── */}
      <Header
        activeView={view}
        onNavigate={setView}
        favoritesCount={favorites.length}
      >
        <SearchBar
          query={query}
          onChange={(e) => setQuery(e.target.value)}
          moodQuery={moodQuery}
          onMoodChange={(e) => setMoodQuery(e.target.value)}
          onMoodSubmit={() => console.log('Mood submitted:', moodQuery)}
        />
      </Header>

      {/* ── Main content ── */}
      <main className="cs-main" id="main-content">
        {/* Mobile search (shown below 640px when header search hides) */}
        <div className="cs-mobile-search">
          <SearchBar
            query={query}
            onChange={(e) => setQuery(e.target.value)}
            moodQuery={moodQuery}
            onMoodChange={(e) => setMoodQuery(e.target.value)}
            onMoodSubmit={() => console.log('Mood submitted:', moodQuery)}
          />
        </div>

        {view === 'browse' ? (
          <MediaGrid
            ref={sentinelRef}
            movies={movies}
            onToggleFavorite={handleToggleFavorite}
            heading="Trending Now"
            isLoading={false}
            emptyTitle="No movies found"
            emptyMessage="Try a different search or describe your mood to discover something new."
          />
        ) : (
          <FavoritesView
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="cs-footer">
        Built with 🎬 by <span className="cs-footer__brand">Cine-Stream</span>
      </footer>
    </div>
  );
}
