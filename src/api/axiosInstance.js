import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// c) Attach the token to appointment API requests automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hospital_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// f) Handle unauthorized and expired-token responses (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and session data
      localStorage.removeItem('hospital_auth_token');
      alert('Session expired or unauthorized. Please log in again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;