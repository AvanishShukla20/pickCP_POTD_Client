import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
      'Content-Type': 'application/json'
  }
});

// Attach token to every request
// In your api.js interceptor, add this console.log:
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
    console.log('Auth header:', config.headers.Authorization); // Add this line
  }
  return config;
});


export default API;