// src/api/auth.js
import axiosInstance from './axios';

export const authAPI = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/api/token/', credentials);
    const { access, refresh } = response.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/api/usuarios/register/', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  checkAuth: async () => {
    try {
      await axiosInstance.get('/health/');
      return true;
    } catch (error) {
      return false;
    }
  }
};