// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import AuthService from './AuthService';
import TokenService from './tokenService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!TokenService.getAccessToken());

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (TokenService.getAccessToken()) {
        try {
          const user = await AuthService.getCurrentUser();
          setCurrentUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          setCurrentUser(null);
          setIsAuthenticated(false);
          TokenService.removeTokens();
        }
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      setIsAuthenticated, 
      setCurrentUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
