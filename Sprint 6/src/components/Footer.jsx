import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">Shopora</Link>
          <p className="footer__tagline">
            Curated collections for the modern shopper.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">Shop</h4>
            <ul>
              <li><Link to="/shop" className="footer__link">All Products</Link></li>
              <li><Link to="/shop" className="footer__link">New Arrivals</Link></li>
              <li><Link to="/shop" className="footer__link">Best Sellers</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Help</h4>
            <ul>
              <li><Link to="/contact" className="footer__link">Contact Us</Link></li>
              <li><Link to="/contact" className="footer__link">FAQs</Link></li>
              <li><Link to="/contact" className="footer__link">Returns</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Account</h4>
            <ul>
              <li><Link to="/login" className="footer__link">Login</Link></li>
              <li><Link to="/cart" className="footer__link">My Cart</Link></li>
              <li><Link to="/checkout" className="footer__link">Checkout</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Shopora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
