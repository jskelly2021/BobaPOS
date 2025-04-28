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
    fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/user`, {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not authenticated');
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
       // if we're in customer mode, skip employee auth entirely
      /*const mode = localStorage.getItem("userMode");
      if (mode === "customer") {
        setUser(null);
        return;
      }
    */
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
