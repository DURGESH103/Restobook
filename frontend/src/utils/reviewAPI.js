import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const reviewAPI = {
  getByMenuItem: async (menuItemId) => {
    const { data } = await axios.get(`${API_URL}/reviews/menu/${menuItemId}`);
    return data;
  },

  create: async (reviewData) => {
    const { data } = await axios.post(`${API_URL}/reviews`, reviewData, {
      headers: getAuthHeader()
    });
    return data;
  },

  update: async (reviewId, reviewData) => {
    const { data } = await axios.put(`${API_URL}/reviews/${reviewId}`, reviewData, {
      headers: getAuthHeader()
    });
    return data;
  },

  reply: async (reviewId, reply) => {
    const { data } = await axios.put(`${API_URL}/reviews/${reviewId}/reply`, 
      { reply }, 
      { headers: getAuthHeader() }
    );
    return data;
  },

  delete: async (reviewId) => {
    const { data } = await axios.delete(`${API_URL}/reviews/${reviewId}`, {
      headers: getAuthHeader()
    });
    return data;
  }
};
