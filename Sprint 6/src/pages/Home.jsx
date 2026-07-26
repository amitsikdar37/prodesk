import { Link } from 'react-router-dom';
import './Home.css';

const categories = [
  { name: 'Smartphones', icon: '📱', slug: 'smartphones' },
  { name: 'Laptops', icon: '💻', slug: 'laptops' },
  { name: 'Fragrances', icon: '🌸', slug: 'fragrances' },
  { name: 'Skincare', icon: '✨', slug: 'skincare' },
  { name: 'Groceries', icon: '🛒', slug: 'groceries' },
  { name: 'Home Decor', icon: '🏠', slug: 'home-decoration' },
];

const features = [
  { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over $50' },
  { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { icon: '🔒', title: 'Secure Payments', desc: 'Your data is protected' },
  { icon: '💬', title: '24/7 Support', desc: 'We\'re here whenever you need' },
];

export default function Home() {
  return (
    <div className="page-wrapper">
      <section className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">New Season Arrivals</span>
          <h1 className="hero__title">
            Discover Your<br />
            <span className="hero__title-accent">Perfect Style</span>
          </h1>
          <p className="hero__subtitle">
            Explore thousands of curated products from top brands, delivered right to your door.
          </p>
          <div className="hero__actions">
            <Link to="/shop" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__blob" />
          <div className="hero__image-grid">
            <div className="hero__img-card hero__img-card--tall">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80" alt="Premium watch" />
            </div>
            <div className="hero__img-col">
              <div className="hero__img-card">
                <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80" alt="Skincare" />
              </div>
              <div className="hero__img-card">
                <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&q=80" alt="Sneakers" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you're looking for</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link to="/shop" key={cat.slug} className="category-card">
                <span className="category-card__icon">{cat.icon}</span>
                <span className="category-card__name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feat) => (
              <div key={feat.title} className="feature-item">
                <span className="feature-item__icon">{feat.icon}</span>
                <div>
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
