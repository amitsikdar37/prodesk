import { FiSearch } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import './SearchBar.css';

/**
 * SearchBar — Dual-input search strip.
 *
 * Left input  → standard movie title query (controlled via onChange).
 * Right input → AI Mood Matcher free-text prompt (submitted via onMoodSubmit).
 *
 * @param {Object}   props
 * @param {string}   [props.query]        – current search value (controlled)
 * @param {Function} props.onChange        – (e: ChangeEvent) => void
 * @param {string}   [props.moodQuery]    – current mood input value (controlled)
 * @param {Function} [props.onMoodChange] – (e: ChangeEvent) => void
 * @param {Function} props.onMoodSubmit   – (e: FormEvent) => void
 */
export default function SearchBar({
  query = '',
  onChange,
  moodQuery = '',
  onMoodChange,
  onMoodSubmit,
}) {
  return (
    <div className="cs-search" role="search" aria-label="Search movies">
      {/* ── Standard Search ── */}
      <div className="cs-search__group">
        <span className="cs-search__icon" aria-hidden="true">
          <FiSearch />
        </span>
        <input
          id="cs-search-input"
          className="cs-search__input"
          type="search"
          placeholder="Search movies, shows, genres…"
          aria-label="Search movies by title"
          value={query}
          onChange={onChange}
          autoComplete="off"
        />
      </div>

      <span className="cs-search__divider" aria-hidden="true" />

      {/* ── AI Mood Matcher ── */}
      <form
        className="cs-search__group cs-search__group--mood"
        onSubmit={(e) => {
          e.preventDefault();
          onMoodSubmit?.(e);
        }}
      >
        <span className="cs-search__icon" aria-hidden="true">
          <HiOutlineSparkles />
        </span>
        <input
          id="cs-mood-input"
          className="cs-search__input cs-search__input--mood"
          type="text"
          placeholder="Describe your mood…"
          aria-label="AI Mood Matcher"
          value={moodQuery}
          onChange={onMoodChange}
          autoComplete="off"
        />
        <button
          type="submit"
          className="cs-search__ai-btn"
          aria-label="Match mood"
        >
          <span className="cs-search__ai-icon"><HiOutlineSparkles /></span>
          Match
        </button>
      </form>
    </div>
  );
}
