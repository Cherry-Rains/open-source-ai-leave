// src/config.js
export const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://10.0.11.50:33377'
  : 'http://10.0.11.50:33377';