import axios from 'axios';
import {API_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_TOKEN_KEY} from '../constants';
import {TokenDto} from '../dtos/auth.dto';

let headers = {'Content-Type': 'application/json'};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async config => {
    if (config.url === '/auth/login') {
      return config;
    }
    const token = await AsyncStorage.getItem(STORAGE_TOKEN_KEY);
    const parsedToken: TokenDto = token ? JSON.parse(token) : null;
    if (parsedToken?.token) {
      config.headers.Authorization = `Bearer ${parsedToken.token}`;
    }
    console.log(parsedToken?.token);
    return config;
  },
  error => {
    console.log('api error when request sent: ', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
