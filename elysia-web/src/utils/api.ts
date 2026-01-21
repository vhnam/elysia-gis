import axios, { type AxiosError } from 'axios';
import { toast } from 'sonner';

import { Config } from '@/config/env';

import useAuthStore from '@/stores/auth';

export const api = axios.create({
  baseURL: `${Config.API_URL}/api/v1`,
  withCredentials: true, // Include cookies in requests for better-auth
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const status = error.response.status;
    const message = error.response.data?.message || 'An error occurred';

    // Handle 401 Unauthorized - redirect to sign in
    if (status === 401) {
      const { setToken, setUser } = useAuthStore.getState();
      setToken(null);
      setUser(null);
      // Don't show toast for 401 as redirect will happen
      window.location.href = '/auth/sign-in';
      return Promise.reject(error);
    }

    // Handle 403 Forbidden
    if (status === 403) {
      toast.error('You do not have permission to perform this action.');
      return Promise.reject(error);
    }

    // Handle 500+ server errors
    if (status >= 500) {
      toast.error('Server error. Please try again later.');
      return Promise.reject(error);
    }

    // Handle other client errors (400-499)
    if (status >= 400) {
      toast.error(message);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
