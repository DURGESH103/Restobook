import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menu API
export const menuAPI = {
  getAll: (category = '') => api.get(`/menu${category ? `?category=${category}` : ''}`),
  getById: (id) => api.get(`/menu/${id}`),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
};

// Booking API
export const bookingAPI = {
  getAll: () => api.get('/bookings'),
  create: (data) => api.post('/bookings', data),
  getById: (id) => api.get(`/bookings/${id}`),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
};

// Testimonial API
export const testimonialAPI = {
  getApproved: () => api.get('/testimonials'),
  getAll: () => api.get('/testimonials/all'),
  create: (data) => api.post('/testimonials', data),
  approve: (id) => api.put(`/testimonials/${id}/approve`),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// Contact API
export const contactAPI = {
  send: (data) => api.post('/contact', data),
};

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => {
    const token = localStorage.getItem('token');
    return api.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

// Set auth token for all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;