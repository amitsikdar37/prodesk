import { Link } from 'react-router-dom';
import './Home.css';

const categories = [
  {
    name: 'Tech & Electronics',
    tag: 'Innovation',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    slug: 'smartphones',
    size: 'large'
  },
  {
    name: 'Luxury Skincare',
    tag: 'Self-Care',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    slug: 'skincare',
    size: 'small'
  },
  {
    name: 'Fine Fragrances',
    tag: 'Aroma',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    slug: 'fragrances',
    size: 'small'
  },
  {
    name: 'Modern Home & Decor',
    tag: 'Interior',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    slug: 'home-decoration',
    size: 'large'
  },
  {
    name: 'Timeless Apparel & Watches',
    tag: 'Wardrobe',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    slug: 'watches',
    size: 'small'
  },
  {
    name: 'Artisanal Pantry',
    tag: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    slug: 'groceries',
    size: 'small'
  }
];

const features = [
  {
    title: 'Complimentary Shipping',
    desc: 'Seamless express delivery on all orders exceeding ₹1,499.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19a2 2 0 0 1 1.62.83l1.38 2.05a2 2 0 0 0 1.62.83H19a2 2 0 0 1 2 2v2"></path>
        <path d="M14 18h1"></path>
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
        <circle cx="8" cy="18" r="2"></circle>
        <circle cx="17" cy="18" r="2"></circle>
      </svg>
    )
  },
  {
    title: '30-Day Guarantee',
    desc: 'Effortless prepaid returns and complimentary exchanges within 30 days.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
      </svg>
    )
  },
  {
    title: 'Secure Encryption',
    desc: 'Bank-grade checkout encryption ensuring total privacy and peace of mind.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  },
  {
    title: 'Dedicated Concierge',
    desc: 'Expert support specialists available 24/7 to assist with your selection.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    )
  }
];

export default function Home() {
  return (
    <div className="page-wrapper">
      <section className="hero">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Autumn / Winter '26 Collection
          </div>
          <h1 className="hero__title">
            The New Heritage of<br />
            <span className="hero__title-accent">Elevated Design.</span>
          </h1>
          <p className="hero__subtitle">
            Explore a globally curated anthology of architectural home decor, high-end horology, fine fragrances, and modern essentials. Crafted without compromise.
          </p>
          <div className="hero__actions">
            <Link to="/shop" className="btn btn-primary btn-lg hero__cta">
              <span>Explore the Catalog</span>
              <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 10h12m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">
              Our Craftsmanship
            </Link>
          </div>

          <div className="hero__proof">
            <div className="hero__avatars">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Client" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Client" />
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80" alt="Client" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="Client" />
            </div>
            <div className="hero__proof-text">
              <div className="hero__proof-stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                <strong>4.9 / 5.0</strong>
              </div>
              <span>Trusted by 25,000+ selective clients worldwide</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__stage">
            <div className="hero__main-img-wrap">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80" alt="Luxury fashion fashion editorial" />
              <div className="hero__main-overlay"></div>
            </div>
            
            <div className="hero__glass-tag">
              <span className="hero__glass-icon">✦</span>
              <span>Edition 04 • Curated Drop</span>
            </div>

            <Link to="/product/1" className="hero__glass-card">
              <div className="hero__glass-thumb">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" alt="Minimalist Chronograph" />
              </div>
              <div className="hero__glass-info">
                <span className="hero__glass-title">Minimalist Chronograph G-1</span>
                <div className="hero__glass-meta">
                  <span className="hero__glass-rating">★ 5.0</span>
                  <span className="hero__glass-price">₹28,200</span>
                </div>
              </div>
              <div className="hero__glass-action" aria-label="View Product">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Curated Collections</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Immerse yourself in our thoughtfully organized selections, tailored for elevated living.</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link to="/shop" key={cat.slug} className={`category-card category-card--${cat.size}`}>
                <div className="category-card__image-wrap">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                  <div className="category-card__overlay"></div>
                </div>
                <div className="category-card__content">
                  <span className="category-card__tag">{cat.tag}</span>
                  <h3 className="category-card__name">{cat.name}</h3>
                  <span className="category-card__link">
                    Explore Collection
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10m-4-4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h3 className="features-tagline">The Shopora Experience</h3>
          </div>
          <div className="features-grid">
            {features.map((feat) => (
              <div key={feat.title} className="feature-item">
                <div className="feature-item__icon-wrapper">
                  {feat.icon}
                </div>
                <div className="feature-item__content">
                  <h4 className="feature-item__title">{feat.title}</h4>
                  <p className="feature-item__desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner__content">
              <h2 className="cta-banner__title">Ready to start shopping?</h2>
              <p className="cta-banner__subtitle">Browse our full catalog of 100+ premium products.</p>
              <Link to="/shop" className="btn btn-accent btn-lg">
                Explore All Products →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

