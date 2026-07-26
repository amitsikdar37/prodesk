import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const StarRating = ({ rating }) => (
  <div className="pd__stars">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={s <= Math.round(rating) ? 'star-filled' : 'star-empty'}>★</span>
    ))}
    <span className="pd__rating-text">{rating.toFixed(1)} out of 5</span>
  </div>
);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/shop');
      });
  }, [id, navigate]);

  const inCart = cart.some((item) => item.id === Number(id));

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="container pd-skeleton">
          <div className="skeleton pd-skeleton__image" />
          <div className="pd-skeleton__body">
            <div className="skeleton pd-skeleton__line pd-skeleton__line--wide" />
            <div className="skeleton pd-skeleton__line" />
            <div className="skeleton pd-skeleton__line pd-skeleton__line--short" />
          </div>
        </div>
      </div>
    );
  }

  if (!product || product.message) return null;

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        <nav className="pd__breadcrumb">
          <Link to="/" className="pd__breadcrumb-link">Home</Link>
          <span className="pd__breadcrumb-sep">›</span>
          <Link to="/shop" className="pd__breadcrumb-link">Shop</Link>
          <span className="pd__breadcrumb-sep">›</span>
          <span className="pd__breadcrumb-current">{product.title}</span>
        </nav>

        <div className="pd__layout">
          <div className="pd__gallery">
            <div className="pd__main-image">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="pd__main-img"
              />
              {product.discountPercentage > 5 && (
                <span className="pd__badge">
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="pd__thumbnails">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`pd__thumb ${selectedImage === i ? 'pd__thumb--active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pd__info">
            <span className="pd__category">{product.category}</span>
            <h1 className="pd__title">{product.title}</h1>
            <span className="pd__brand">by {product.brand || 'Unknown Brand'}</span>

            <StarRating rating={product.rating} />

            <div className="pd__price-block">
              <span className="pd__price">${discountedPrice}</span>
              {product.discountPercentage > 5 && (
                <span className="pd__original-price">${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="pd__description">{product.description}</p>

            <div className="pd__meta">
              <div className="pd__meta-item">
                <span className="pd__meta-label">Stock</span>
                <span className={`pd__meta-value ${product.stock < 10 ? 'pd__meta-value--low' : ''}`}>
                  {product.stock < 10 ? `Only ${product.stock} left!` : `${product.stock} in stock`}
                </span>
              </div>
              <div className="pd__meta-item">
                <span className="pd__meta-label">SKU</span>
                <span className="pd__meta-value">{product.sku || `SKU-${product.id}`}</span>
              </div>
              {product.warrantyInformation && (
                <div className="pd__meta-item">
                  <span className="pd__meta-label">Warranty</span>
                  <span className="pd__meta-value">{product.warrantyInformation}</span>
                </div>
              )}
            </div>

            <div className="pd__actions">
              <button
                className={`btn btn-lg pd__add-btn ${added ? 'pd__add-btn--added' : ''}`}
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? '✓ Added to Cart' : inCart ? 'Add Another' : 'Add to Cart'}
              </button>
              {inCart && (
                <Link to="/cart" className="btn btn-outline btn-lg">
                  View Cart
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
