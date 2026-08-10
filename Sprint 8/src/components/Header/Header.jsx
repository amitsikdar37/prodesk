import { FiFilm, FiHeart, FiGrid } from 'react-icons/fi';
import './Header.css';

/**
 * Header — Fixed top bar with logo and navigation.
 *
 * @param {Object}   props
 * @param {string}   props.activeView        – "browse" | "favorites"
 * @param {Function} props.onNavigate        – (view: string) => void
 * @param {number}   [props.favoritesCount]  – badge count for the Favorites tab
 * @param {React.ReactNode} [props.children] – slot for injecting SearchBar inline
 */
export default function Header({
  activeView = 'browse',
  onNavigate,
  favoritesCount = 0,
  children,
}) {
  return (
    <header className="cs-header" role="banner">
      {/* ── Logo ── */}
      <div className="cs-header__logo" aria-label="Cine-Stream home">
        <div className="cs-header__logo-icon" aria-hidden="true">
          <FiFilm />
        </div>
        <span className="cs-header__logo-text">Cine-Stream</span>
      </div>

      {/* ── Optional centre slot (e.g. SearchBar) ── */}
      {children}

      {/* ── Navigation ── */}
      <nav className="cs-header__nav" aria-label="Main navigation">
        <button
          className={`cs-header__nav-btn ${activeView === 'browse' ? 'cs-header__nav-btn--active' : ''}`}
          onClick={() => onNavigate?.('browse')}
          aria-current={activeView === 'browse' ? 'page' : undefined}
        >
          <span className="cs-header__nav-icon"><FiGrid /></span>
          <span>Browse</span>
        </button>

        <button
          className={`cs-header__nav-btn ${activeView === 'favorites' ? 'cs-header__nav-btn--active' : ''}`}
          onClick={() => onNavigate?.('favorites')}
          aria-current={activeView === 'favorites' ? 'page' : undefined}
        >
          <span className="cs-header__nav-icon"><FiHeart /></span>
          <span>Favorites</span>
          {favoritesCount > 0 && (
            <span className="cs-header__fav-count" aria-label={`${favoritesCount} favorites`}>
              {favoritesCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
