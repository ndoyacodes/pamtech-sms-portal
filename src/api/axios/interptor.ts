import { store } from '@/store/Store';
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import { setCredentials } from '@/store/slices/auth/auth.slice';
import { displaySessionExpiredModal } from './session-expirition';

export const setupInterceptors = (instance: AxiosInstance): void => {
  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const state = store.getState();
      const accessToken = state.auth.tokens.access;
      const refreshToken = state.auth.tokens.refresh;
      console.log('refresh token', refreshToken);
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    response => response.data,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const state = store.getState();
          const refreshToken = state.auth.tokens.refresh;

          if (!refreshToken) {
            throw new Error('No refresh token available');
          }
       
          const response = await axios.post(`/api/auth/refresh`, {
            refreshToken: refreshToken
          });

          console.log(response);
          

          store.dispatch(setCredentials({
            accessToken: response.data.access,
            refreshToken: response.data.refresh,
            //@ts-ignore
            user: state.auth.user
          }))
        
          const newAccessToken = response.data.access;
        
          // Update the failed request's authorization header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return instance(originalRequest);
        } catch (refreshError) {
          // Clear local storage and redirect to login page
          localStorage.clear();
             setTimeout(() => {
            displaySessionExpiredModal(); 
          }, 100);
      
          window.location.reload();
          return Promise.reject(refreshError);
        }
      }

      // Handle other errors
      // const errorMessage = 'An error occurred';
      return Promise.reject(error);
    }
  );
};



