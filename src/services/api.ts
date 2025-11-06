import axios from 'axios';
import { Product, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const productService = {
  // Get all products
  getAllProducts: async (params?: {
    category?: string;
    brand?: string;
    limit?: number;
  }): Promise<ApiResponse<Product[]>> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by slug
  getProductBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  },

  // Get product variants
  getProductVariants: async (slug: string) => {
    const response = await api.get(`/products/${slug}/variants`);
    return response.data;
  },

  // Get EMI plans for a product
  getEMIPlans: async (slug: string) => {
    const response = await api.get(`/products/${slug}/emi-plans`);
    return response.data;
  },
};

export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;