import axios from 'axios';
import {BACKEND_URL} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  console.log(BACKEND_URL);

  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers,
  });

  return instance;
};

export default http;
