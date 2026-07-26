import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR, toINR } from '../utils/currency';
import './Cart.css';

export default function Cart() {
  const { cart, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const subtotalINR = toINR(totalPrice);
  const shippingINR = subtotalINR > 1499 || subtotalINR === 0 ? 0 : 99;
  const grandTotalINR = subtotalINR + shippingINR;

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container cart-empty">
          <div className="cart-empty__icon">🛍️</div>
          <h2 className="cart-empty__title">Your cart is empty</h2>
          <p className="cart-empty__subtitle">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="cart-header">
          <h1 className="section-title">Shopping Cart</h1>
          <span className="cart-header__count">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => {
              const discountedPrice = (
                item.price * (1 - (item.discountPercentage || 0) / 100)
              ).toFixed(2);

              return (
                <div key={item.id} className="cart-item animate-fade-in">
                  <div className="cart-item__image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  <div className="cart-item__details">
                    <span className="cart-item__category">{item.category}</span>
                    <Link to={`/product/${item.id}`} className="cart-item__title">
                      {item.title}
                    </Link>
                    <span className="cart-item__price">{formatINR(discountedPrice)}</span>
                  </div>
                  <div className="cart-item__controls">
                    <div className="cart-item__qty">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-item__qty-value">{item.quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="cart-item__subtotal">
                      {formatINR(discountedPrice * item.quantity)}
                    </span>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}

            <button className="btn btn-ghost cart-clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="cart-summary">
            <h3 className="cart-summary__title">Order Summary</h3>

            <div className="cart-summary__rows">
              {cart.map((item) => {
                const unitPrice = (item.price * (1 - (item.discountPercentage || 0) / 100)).toFixed(2);
                return (
                  <div key={item.id} className="cart-summary__row">
                    <span className="cart-summary__item-name">
                      {item.title.length > 24 ? item.title.slice(0, 24) + '…' : item.title} × {item.quantity}
                    </span>
                    <span>{formatINR(unitPrice * item.quantity)}</span>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary__divider" />

            <div className="cart-summary__row cart-summary__row--subtotal">
              <span>Subtotal</span>
              <span>₹{subtotalINR.toLocaleString('en-IN')}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping (Free over ₹1,499)</span>
              <span className="cart-summary__free">
                {shippingINR === 0 ? 'Free' : '₹99'}
              </span>
            </div>

            <div className="cart-summary__divider" />

            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>₹{grandTotalINR.toLocaleString('en-IN')}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary btn-lg cart-summary__checkout">
              Proceed to Checkout →
            </Link>

            <Link to="/shop" className="cart-summary__continue">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
