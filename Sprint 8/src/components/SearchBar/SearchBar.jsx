import { FiSearch, FiLoader } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import './SearchBar.css';

export default function SearchBar({
  query = '',
  onChange,
  moodQuery = '',
  onMoodChange,
  onMoodSubmit,
  isAiLoading = false,
}) {
  return (
    <div className="cs-search" role="search" aria-label="Search movies">
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
          disabled={isAiLoading}
        >
          <span className={`cs-search__ai-icon ${isAiLoading ? 'cs-search__ai-icon--spin' : ''}`}>
            {isAiLoading ? <FiLoader /> : <HiOutlineSparkles />}
          </span>
          {isAiLoading ? 'Matching...' : 'Match'}
        </button>
      </form>
    </div>
  );
}
