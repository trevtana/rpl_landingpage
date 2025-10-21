import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

// Add token to all requests if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const activityAPI = {
  getAll: (params) => API.get('/activities', { params }),
  getOne: (id) => API.get(`/activities/${id}`),
  create: (data) => {
    // Let axios auto-detect FormData and set correct Content-Type with boundary
    return API.post('/activities', data);
  },
  update: (id, data) => {
    // Laravel can't handle PUT with FormData, use POST with _method
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      return API.post(`/activities/${id}`, data);
    }
    return API.put(`/activities/${id}`, data);
  },
  delete: (id) => API.delete(`/activities/${id}`)
};

export const achievementAPI = {
  getAll: (params) => API.get('/achievements', { params }),
  getOne: (id) => API.get(`/achievements/${id}`),
  create: (data) => {
    // Let axios auto-detect FormData and set correct Content-Type with boundary
    return API.post('/achievements', data);
  },
  update: (id, data) => {
    // Laravel can't handle PUT with FormData, use POST with _method
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      return API.post(`/achievements/${id}`, data);
    }
    return API.put(`/achievements/${id}`, data);
  },
  delete: (id) => API.delete(`/achievements/${id}`)
};

export const authAPI = {
  login: (credentials) => API.post('/login', credentials),
  logout: () => API.post('/logout'),
  getUser: () => API.get('/user')
};