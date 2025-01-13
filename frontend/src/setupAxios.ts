import axios from "axios";
//Axios Interceptor
export const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if(token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
