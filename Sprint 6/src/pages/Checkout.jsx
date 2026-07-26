import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatINR, toINR } from '../utils/currency';
import './Checkout.css';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const subtotalINR = toINR(totalPrice);
  const shipping = subtotalINR > 1499 || subtotalINR === 0 ? 0 : 99;
  const tax = Math.round(subtotalINR * 0.18); // 18% GST
  const grandTotal = subtotalINR + shipping + tax;

  const handlePlaceOrder = () => {
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container checkout-empty">
          <div className="checkout-empty__icon">🎉</div>
          <h2 className="checkout-empty__title">Order Complete!</h2>
          <p className="checkout-empty__subtitle">
            Your order has been placed successfully. Thank you for shopping with us!
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="checkout-header">
          <h1 className="section-title">Checkout</h1>
          <div className="checkout-steps">
            <span className="checkout-step checkout-step--active">1. Cart</span>
            <span className="checkout-step-arrow">›</span>
            <span className="checkout-step checkout-step--active">2. Details</span>
            <span className="checkout-step-arrow">›</span>
            <span className="checkout-step">3. Confirm</span>
          </div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">
            <div className="checkout-section">
              <h3 className="checkout-section__title">Delivery Information</h3>
              <div className="checkout-user-banner">
                <span className="checkout-user-avatar">👤</span>
                <div>
                  <p className="checkout-user-name">{user?.name || 'Guest'}</p>
                  <p className="checkout-user-email">{user?.email}</p>
                </div>
                <span className="checkout-user-badge">Guest</span>
              </div>
              <div className="checkout-form-grid">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input className="form-input" type="text" defaultValue="Guest" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input className="form-input" type="text" placeholder="Doe" />
                </div>
                <div className="form-group checkout-form-grid__full">
                  <label className="form-label">Delivery Address</label>
                  <input className="form-input" type="text" placeholder="123 Main St, Apartment 4B" />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input className="form-input" type="text" placeholder="New York" />
                </div>
                <div className="form-group">
                  <label className="form-label">ZIP Code</label>
                  <input className="form-input" type="text" placeholder="10001" />
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h3 className="checkout-section__title">Payment Method</h3>
              <div className="checkout-payment-options">
                <label className="checkout-payment-option checkout-payment-option--selected">
                  <input type="radio" name="payment" defaultChecked readOnly />
                  <span className="checkout-payment-label">💳 Credit / Debit Card</span>
                </label>
                <label className="checkout-payment-option">
                  <input type="radio" name="payment" />
                  <span className="checkout-payment-label">📱 UPI / Wallet</span>
                </label>
                <label className="checkout-payment-option">
                  <input type="radio" name="payment" />
                  <span className="checkout-payment-label">🏦 Net Banking</span>
                </label>
              </div>
            </div>
          </div>

          <div className="checkout-sidebar">
            <div className="checkout-order-summary">
              <h3 className="checkout-order-summary__title">Your Order</h3>
              <div className="checkout-order-items">
                {cart.map((item) => {
                  const unitPrice = (item.price * (1 - (item.discountPercentage || 0) / 100)).toFixed(2);
                  return (
                    <div key={item.id} className="checkout-order-item">
                      <div className="checkout-order-item__img">
                        <img src={item.thumbnail} alt={item.title} />
                        <span className="checkout-order-item__qty">{item.quantity}</span>
                      </div>
                      <p className="checkout-order-item__name">
                        {item.title.length > 28 ? item.title.slice(0, 28) + '…' : item.title}
                      </p>
                      <p className="checkout-order-item__price">
                        {formatINR(unitPrice * item.quantity)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="checkout-order-totals">
                <div className="checkout-order-row">
                  <span>Subtotal</span>
                  <span>₹{subtotalINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="checkout-order-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-success' : ''}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="checkout-order-row">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="checkout-order-divider" />
                <div className="checkout-order-row checkout-order-row--total">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="btn btn-accent btn-lg checkout-place-order" onClick={handlePlaceOrder}>
                Place Order →
              </button>

              <div className="checkout-trust">
                <span>🔒 Secure 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
