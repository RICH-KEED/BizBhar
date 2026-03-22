import axios from 'axios';

/** Same-origin in dev (src/setupProxy.js → backend). Override with REACT_APP_API_URL if needed. */
const API_BASE_URL = (process.env.REACT_APP_API_URL || '') + '/api';

const api = axios.create({
  baseURL: API_BASE_URL || '/api',
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
  /** Seller only — JWT required */
  listMyShop: () => api.get('/products/my-shop', { params: { _t: Date.now() } }),
  create: (data) => api.post('/products', data),
  /** Seller only — partial body, e.g. { stock: 12 } */
  update: (id, data) => api.put(`/products/${id}`, data),
};

export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (cartItemId, data) => api.put(`/cart/${cartItemId}`, data),
  remove: (cartItemId) => api.delete(`/cart/${cartItemId}`),
  sync: (body) => api.post('/cart/sync', body),
};

export const checkoutAPI = {
  createPaymentIntent: () => api.post('/checkout/payment-intent'),
  orderStatus: (paymentIntentId) =>
    api.get(`/checkout/order-status/${encodeURIComponent(paymentIntentId)}`),
};

export const orderAPI = {
  myOrders: () => api.get('/orders/my'),
  shopOrders: (shopId) => api.get(`/orders/shop/${shopId}`),
  updateStatus: (orderId, data) => api.put(`/orders/${orderId}/status`, data),
};

export default api;
