// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

// Nuevo hook personalizado
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Aquí podrías hacer una petición para obtener los datos del usuario
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Aquí irá tu lógica de login
      // const response = await loginAPI(credentials);
      // localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
      // setUser(response.user);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  if (loading) {
    return null; // O un componente de loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}