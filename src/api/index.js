import axios from 'axios';

// Import API URL from environment variable (Yen Misal Pengen Mbok Hosting, Bas) or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Automatically attach token to every request if it exists (Based on Backend)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
