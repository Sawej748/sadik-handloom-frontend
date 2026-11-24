import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchProducts = (params) => API.get('/products', { params });
export const adminLogin = (data) => API.post('/auth/login', data);
export const createProduct = (formData) => API.post('/admin/products', formData);
export const updateProduct = (id, formData) => API.put(`/admin/products/${id}`, formData);
export const deleteProduct = (id) => API.delete(`/admin/products/${id}`);

export default API;