// src/config.js
export const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://10.0.13.248:11111'
  : 'http://10.0.13.248:11111';