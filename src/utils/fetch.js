import axios from 'axios';
import baseUrl from '@/utils/env';
import { getAuthToken } from '@/utils/auth';
import router from '@/router';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: true,
});

// Alter defaults after instance has been created

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getAuthToken();
    return config;
  },
  error => Promise.reject(error),
);


// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Do something with response data
  const status = response.status;
  if (status >= 200 && status < 300) {
    return response.data;
  }
  return Promise.reject('error');
}, (error) => {
  // Do something with response error
  const status = error.response.status;
  if (status === 401) {
    router.replace({ name: 'login' });
  }
  // console.log('fetch err: ', error);
  return Promise.reject(error);
});

export default instance;
