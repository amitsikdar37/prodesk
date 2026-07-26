import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const StarRating = ({ rating }) => {
  return (
    <div className="product-card__stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? 'star-filled' : 'star-empty'}
        >
          ★
        </span>
      ))}
      <span className="product-card__rating-value">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const discountedPrice = (
    product.price * (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${product.id}`)}
    >
      <div className="product-card__image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
        {product.discountPercentage > 5 && (
          <span className="product-card__discount-badge">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.title}</h3>
        <StarRating rating={product.rating} />
        <div className="product-card__price-row">
          <span className="product-card__price">${discountedPrice}</span>
          {product.discountPercentage > 5 && (
            <span className="product-card__original-price">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
