import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/profile'),
};

// Shop endpoints
export const shopAPI = {
  createShop: (data) => api.post('/shops', data),
  getMyShop: () => api.get('/shops/my-shop'),
  getShopStats: (id) => api.get(`/shops/${id}/stats`),
};

export const productAPI = {
  list: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
};

export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (cartItemId, data) => api.put(`/cart/${cartItemId}`, data),
  remove: (cartItemId) => api.delete(`/cart/${cartItemId}`),
  sync: (body) => api.post('/cart/sync', body),
};

export default api;
