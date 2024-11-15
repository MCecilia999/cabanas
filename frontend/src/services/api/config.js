// src/services/axiosConfig.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
