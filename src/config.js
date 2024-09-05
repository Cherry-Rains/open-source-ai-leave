// src/config.js
export const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://10.0.13.223:11111'
  : 'https://api.example.com';