import { forwardRef } from 'react';
import { FiFilm } from 'react-icons/fi';
import MediaCard from '../MediaCard/MediaCard';
import './MediaGrid.css';

const MediaGrid = forwardRef(function MediaGrid(
  {
    movies = [],
    onToggleFavorite,
    heading,
    isLoading = false,
    hasMore = true,
    emptyTitle = 'Nothing here yet',
    emptyMessage = 'Start exploring to fill this space with great movies.',
  },
  ref,
) {
  return (
    <section className="cs-grid-section" aria-label={heading || 'Movie grid'}>
      {/* ── Optional heading ── */}
      {heading && (
        <h2 className="cs-grid__heading">
          <span className="cs-grid__heading-accent" aria-hidden="true" />
          {heading}
        </h2>
      )}

      <div className="cs-grid">
        {movies.length === 0 && !isLoading ? (
          /* ── Empty state ── */
          <div className="cs-grid__empty">
            <span className="cs-grid__empty-icon" aria-hidden="true">
              <FiFilm />
            </span>
            <p className="cs-grid__empty-title">{emptyTitle}</p>
            <p className="cs-grid__empty-text">{emptyMessage}</p>
          </div>
        ) : (
          movies.map((movie) => (
            <MediaCard
              key={movie.id}
              title={movie.title}
              year={movie.release_date}
              rating={movie.vote_average}
              posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              isFavorite={movie.isFavorite}
              onToggleFavorite={() => onToggleFavorite?.(movie)}
            />
          ))
        )}

        {/* ── Loading spinner ── */}
        {isLoading && (
          <div className="cs-grid__loader" aria-label="Loading more movies">
            <div className="cs-grid__spinner" />
          </div>
        )}

        {/* ── Infinite-scroll sentinel ── */}
        {movies.length > 0 && hasMore && (
          <div
            ref={ref}
            className="cs-grid__sentinel"
            aria-hidden="true"
          />
        )}
      </div>
    </section>
  );
});

export default MediaGrid;
