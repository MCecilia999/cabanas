import axios from '../api/config';
import TokenService from '../auth/tokenService';

class CabinService {
  constructor() {
    this.getAuthHeader = () => ({
      Authorization: `Bearer ${TokenService.getAccessToken()}`
    });
  }

  async authenticatedRequest(requestFn) {
    try {
      return await requestFn();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const newToken = await TokenService.refreshAccessToken();
          const newHeaders = { Authorization: `Bearer ${newToken}` };
          return await requestFn(newHeaders);
        } catch (refreshError) {
          TokenService.removeTokens();
          throw refreshError;
        }
      }
      throw error;
    }
  }

  async createCabin(cabinData) {
    return this.authenticatedRequest(async (headers = this.getAuthHeader()) => {
      const response = await axios.post('/api/cabanas/', cabinData, { headers });
      return response.data;
    });
  }

  async getUbicaciones() {
    const response = await axios.get('/api/cabanas/ubicaciones/');
    return response.data;
  }

  async createUbicacion(ubicacionData) {
    return this.authenticatedRequest(async (headers = this.getAuthHeader()) => {
      const response = await axios.post('/api/cabanas/ubicaciones/', ubicacionData, { headers });
      return response.data;
    });
  }
  
  async getServicios() {
    const response = await axios.get('/api/cabanas/servicios/');
    return response.data;
  }



  async getCabins() {
    return this.authenticatedRequest(async (headers = this.getAuthHeader()) => {
      const response = await axios.get('/api/cabanas/', { headers });
      return response.data;
    });
  }

  async getCabinById(id) {
    return this.authenticatedRequest(async (headers = this.getAuthHeader()) => {
      const response = await axios.get(`/api/cabanas/${id}/`, { headers });
      return response.data;
    });
  }

  async updateCabin(id, cabinData) {
    return this.authenticatedRequest(async (headers = this.getAuthHeader()) => {
      const response = await axios.put(`/api/cabanas/${id}/`, cabinData, { headers });
      return response.data;
    });
  }

  async deleteCabin(id) {
    return this.authenticatedRequest(async (headers = this.getAuthHeader()) => {
      await axios.delete(`/api/cabanas/${id}/`, { headers });
      return true;
    });
  }
}

export default new CabinService();