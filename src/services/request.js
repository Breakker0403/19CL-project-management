import axios from 'axios';
import { isToken, getToken, setToken } from '../utils/hooks/useAuth';

console.log('api', process.env.REACT_APP_BASE_API);

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 10000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
  config => {
    const token = isToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + getToken(); // Set JWT token
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response pre-processing
service.interceptors.response.use(
  response => {
    if (response.headers.authorization) {
      setToken(response.headers.authorization);
      response.data.token = response.headers.authorization;
    }

    return response.data;
  },
  error => {
    let message = error.message;
    // if (error.response.data && error.response.data.errors) {
    //   message = error.response.data.errors;
    // } else if (error.response.data && error.response.data.error) {
    //   message = error.response.data.error;
    // }

    console.log('error request', message);
    // Message({
    //   message: message,
    //   type: 'error',
    //   duration: 5 * 1000,
    // });
    return Promise.reject(error);
  }
);

export default service;