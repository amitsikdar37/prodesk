import { useRef, useState, useEffect } from 'react';
import { Header, SearchBar, MediaGrid, FavoritesView } from './components';
import './App.css';


export default function App() {

  const [view, setView] = useState('browse');
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [moodQuery, setMoodQuery] = useState('');
  const [page, setPage] = useState(1);
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('movie-favorites')
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('movie-favorites', JSON.stringify(favourites));
  }, [favourites])

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query.trim() === '') {
        fetchPopularMovies();
      } else {
        fetchSearchedMovies(query);
      }
    }, 500);
    return () => clearTimeout(timerId);
  }, [query, page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const tripwire = entries[0];

      if (tripwire.isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [movies]);


  const fetchPopularMovies = async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    if (page === 1) {
      setMovies(data.results);
    } else {
      setMovies(prevMovies => [...prevMovies, ...data.results]);
    }
  }

  const fetchSearchedMovies = async (query) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    setMovies(data.results);
    setPage(1);
  }


  // Ref for the IntersectionObserver sentinel
  const sentinelRef = useRef(null);

  const handleToggleFavorite = (movie) => {
    setFavourites(prevFavourites => {
      const isAlreadyFavourited = prevFavourites.some((fav) =>fav.id === movie.id);

      return isAlreadyFavourited ? prevFavourites.filter((fav) => fav.id !== movie.id) : 
        [...prevFavourites, movie];
    })
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
            movies={movies.map((movie) => ({...movie, 
              isFavorite: favourites.some((fav) => fav.id === movie.id)
            }))}
            onToggleFavorite={handleToggleFavorite}
            heading="Trending Now"
            isLoading={false}
            emptyTitle="No movies found"
            emptyMessage="Try a different search or describe your mood to discover something new."
          />
        ) : (
          <FavoritesView
            favorites={favourites}
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
