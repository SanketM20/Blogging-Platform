// src/utils/api.js
import axios from 'axios';

// Base URL of your backend server
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add JWT token to every request if available
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
