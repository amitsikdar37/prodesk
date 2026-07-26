import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Shop.css';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="page-wrapper">
      <div className="shop-header">
        <div className="container">
          <h1 className="section-title">All Products</h1>
          <p className="section-subtitle">{products.length} items available</p>
        </div>
      </div>

      <div className="container">
        <div className="shop-toolbar">
          <div className="shop-toolbar__search">
            <svg className="shop-toolbar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shop-toolbar__search-input"
            />
          </div>
          <div className="shop-toolbar__sort">
            <label htmlFor="sort-select" className="shop-toolbar__sort-label">Sort:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="shop-toolbar__sort-select"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="shop-skeleton-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="shop-skeleton-card">
                <div className="skeleton shop-skeleton-card__image" />
                <div className="skeleton shop-skeleton-card__line" />
                <div className="skeleton shop-skeleton-card__line shop-skeleton-card__line--short" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="shop-empty">
            <p className="shop-empty__text">No products match your search.</p>
            <button className="btn btn-outline" onClick={() => setSearch('')}>Clear Search</button>
          </div>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                style={{ animationDelay: `${(i % 12) * 40}ms` }}
                className="animate-fade-in-up"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
