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
  getAdminMenu: () => api.get('/menu/admin/my-menu'),
  getById: (id) => api.get(`/menu/${id}`),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
};

// User Booking API
export const userBookingAPI = {
  create: (data) => api.post('/user/bookings', data),
  getMyBookings: () => api.get('/user/bookings/my-bookings'),
  cancel: (id) => api.delete(`/user/bookings/${id}`),
};

// Admin Booking API
export const adminBookingAPI = {
  getAll: (status = '') => api.get(`/admin/bookings${status ? `?status=${status}` : ''}`),
  getStats: () => api.get('/admin/bookings/stats'),
  updateStatus: (id, status) => api.put(`/admin/bookings/${id}/status`, { status }),
  delete: (id) => api.delete(`/admin/bookings/${id}`),
};

// Legacy Booking API (for backward compatibility)
export const bookingAPI = {
  getAll: () => adminBookingAPI.getAll(),
  create: (data) => userBookingAPI.create(data),
  update: (id, data) => adminBookingAPI.updateStatus(id, data.status),
  delete: (id) => adminBookingAPI.delete(id),
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