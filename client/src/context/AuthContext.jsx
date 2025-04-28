import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

/**
 * Wrap your entire app in <AuthProvider> so any component
 * can read user info via useContext(AuthContext).
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // on app load, fetch current session
  useEffect(() => {
    // 1) Which routes should skip the fetch?
    const publicPaths = ['/', '/login', '/welcome', '/menu/customer'];
    const path = window.location.pathname;

    if (publicPaths.includes(path)) {
      // Public page — never hit /auth/user
      setUser(null);
      return;
    }

    // 2) Otherwise, load the session as usual
    (async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/auth/user`,
          { credentials: 'include' }
        );
        if (res.ok) {
          setUser(await res.json());
        } else if (res.status === 401) {
          setUser(null);
        } else {
          console.error('AuthContext unexpected status:', res.status);
          setUser(null);
        }
      } catch (err) {
        console.error('AuthContext network error:', err);
        setUser(null);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
