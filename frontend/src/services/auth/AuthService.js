// src/services/auth/AuthService.js
import axios from '../api/config';
import TokenService from './tokenService';

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post('/api/token/', {
        email,
        password,
      });
      TokenService.saveTokens(response.data.access, response.data.refresh);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    TokenService.removeTokens();
  }

  async getCurrentUser() {
    try {
      const accessToken = TokenService.getAccessToken();
      if (!accessToken) {
        return null;
      }

      const response = await axios.get('/api/usuarios/me/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await TokenService.refreshAccessToken();
          const response = await axios.get('/api/usuarios/me/', {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
          return response.data;
        } catch (refreshError) {
          TokenService.removeTokens();
          throw refreshError;
        }
      }
      throw error;
    }
  }
}

export default new AuthService();
