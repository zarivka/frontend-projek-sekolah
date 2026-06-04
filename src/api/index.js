import axios from 'axios';

const BaseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = BaseApiUrl.replace(/\/$/, '');

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
