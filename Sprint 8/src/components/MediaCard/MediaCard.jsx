import { FiHeart, FiFilm } from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import './MediaCard.css';

export default function MediaCard({
  title,
  year,
  rating,
  posterUrl,
  isFavorite = false,
  onToggleFavorite,
}) {
  return (
    <article className="cs-card" aria-label={title}>
      <div className="cs-card__poster-wrap">
        {posterUrl ? (
          <img
            className="cs-card__poster"
            src={posterUrl}
            alt={`${title} poster`}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="cs-card__poster-placeholder" aria-hidden="true">
            <FiFilm />
          </div>
        )}
        <div className="cs-card__poster-scrim" aria-hidden="true" />

        {/* ── Favorite toggle ── */}
        <button
          className={`cs-card__fav-btn ${isFavorite ? 'cs-card__fav-btn--active' : ''}`}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
          aria-pressed={isFavorite}
        >
          <span
            className={`cs-card__fav-icon ${isFavorite ? 'cs-card__fav-icon--active' : 'cs-card__fav-icon--inactive'}`}
          >
            {isFavorite ? <FaHeart /> : <FiHeart />}
          </span>
        </button>
      </div>

      {/* ── Meta ── */}
      <div className="cs-card__meta">
        <h3 className="cs-card__title">{title}</h3>
        <div className="cs-card__details">
          {year && <span className="cs-card__year">{year}</span>}
          {year && rating != null && <span className="cs-card__dot" aria-hidden="true" />}
          {rating != null && (
            <span className="cs-card__rating">
              <span className="cs-card__star"><FaStar /></span>
              <span className="cs-card__rating-value">{rating.toFixed(1)}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
