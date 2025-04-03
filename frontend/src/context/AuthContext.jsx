import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        clearAuthData();
      }
    }
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
  };

  const login = (userData, token) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
    setUser(userData);
    return userData; // Return user data for navigation handling
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);