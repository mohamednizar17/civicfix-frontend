// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://civicfix-backend-w43z.onrender.com/api', // 🔁 Adjust if your backend is deployed elsewhere
});

// ✅ Automatically attach token to each request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
