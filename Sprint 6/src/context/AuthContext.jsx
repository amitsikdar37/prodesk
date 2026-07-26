import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const loadAuthFromStorage = () => {
  try {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(loadAuthFromStorage);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(authState));
  }, [authState]);

  const loginAsGuest = () => {
    setAuthState({ isAuthenticated: true, user: { name: 'Guest', email: 'guest@shopora.com' } });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
