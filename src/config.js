// src/config.js
export const API_BASE_URL = 'https://api.devstudio.tech';

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  MESSAGES: '/api/messages',
  MESSAGE_BY_ID: (id) => `/api/messages/${id}`,
  MESSAGE_REPLY: (id) => `/api/messages/${id}/reply`,
  MESSAGE_STATS: '/api/messages/stats',
  PROJECTS: '/api/projects',
  PROJECT_BY_ID: (id) => `/api/projects/${id}`,
  PROJECT_TRACK: (code) => `/api/projects/track/${code}`,
};

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};