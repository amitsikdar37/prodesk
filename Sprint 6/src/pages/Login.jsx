import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { loginAsGuest, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate(from, { replace: true });
  };

  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <div className="page-wrapper login-wrapper">
      <div className="login-card">
        <div className="login-card__brand">Shopora</div>
        <h1 className="login-card__title">Welcome Back</h1>
        <p className="login-card__subtitle">
          Sign in to access your cart, orders, and exclusive deals.
        </p>

        <div className="login-divider">
          <span>Quick Access</span>
        </div>

        <button className="btn btn-primary btn-lg login-guest-btn" onClick={handleGuestLogin}>
          <span className="login-guest-btn__icon">👤</span>
          Continue as Guest
        </button>

        <p className="login-card__note">
          No account needed. Your cart and preferences will be saved for this session.
        </p>

        <div className="login-divider">
          <span>Or sign in with</span>
        </div>

        <div className="login-social">
          <button className="login-social__btn" disabled>
            <span>G</span> Google
          </button>
          <button className="login-social__btn" disabled>
            <span>f</span> Facebook
          </button>
        </div>

        <p className="login-card__disclaimer">
          Social login is a UI demo and not functional in this prototype.
        </p>
      </div>
    </div>
  );
}
