import { FiHeart } from 'react-icons/fi';
import MediaCard from '../MediaCard/MediaCard';
import '../MediaGrid/MediaGrid.css';
import './FavoritesView.css';

/**
 * FavoritesView — A dedicated view for favorited movies.
 *
 * Renders a hero banner + a grid of favorited MediaCards.
 * Uses the shared MediaGrid CSS grid tokens for consistency.
 *
 * @param {Object}   props
 * @param {Array}    props.favorites         – array of favorited movie objects
 * @param {Function} props.onToggleFavorite   – (movie) => void
 */
export default function FavoritesView({ favorites = [], onToggleFavorite }) {
  return (
    <section className="cs-favorites" aria-label="Your Favorites">
      {/* ── Banner ── */}
      <div className="cs-favorites__banner">
        <h2 className="cs-favorites__banner-title">
          Your Favorites
        </h2>
        <p className="cs-favorites__banner-sub">
          {favorites.length > 0 ? (
            <>
              You've saved{' '}
              <span className="cs-favorites__banner-count">{favorites.length}</span>{' '}
              {favorites.length === 1 ? 'movie' : 'movies'}
            </>
          ) : (
            'Movies you love will appear here'
          )}
        </p>
      </div>

      {/* ── Grid or empty state ── */}
      {favorites.length === 0 ? (
        <div className="cs-favorites__empty">
          <span className="cs-favorites__empty-icon" aria-hidden="true">
            <FiHeart />
          </span>
          <p className="cs-favorites__empty-title">No favorites yet</p>
          <p className="cs-favorites__empty-text">
            Tap the heart on any movie card to save it here for later.
          </p>
        </div>
      ) : (
        <div className="cs-grid">
          {favorites.map((movie) => (
            <MediaCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              posterUrl={movie.posterUrl}
              isFavorite={movie.isFavorite}
              onToggleFavorite={() => onToggleFavorite?.(movie)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
