import axios from 'axios';
import baseUrl from '@/utils/env';
import { getAuthToken } from '@/utils/auth';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: true,
});

// Alter defaults after instance has been created
instance.defaults.headers.common.Authorization = getAuthToken();

// Add a request interceptor
instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);


// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Do something with response data
  const status = response.status;
  console.log('status: ', status);
  if (status >= 200 && status < 300) {
    return response.data;
  }
  console.log('您还未登录，请先登录！');
  return Promise.reject('error');
}, (error) => {
  // Do something with response error
  console.log('fetch err: ', error);
  return Promise.reject(error);
});

export default instance;
