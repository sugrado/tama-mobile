import axios from 'axios';
import {API_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokenDto} from '../dtos/auth.dto';
import {STORAGE_KEYS} from '../constants';

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
    const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const parsedToken: TokenDto = token ? JSON.parse(token) : null;
    if (parsedToken?.token) {
      config.headers.Authorization = `Bearer ${parsedToken.token}`;
    }
    return config;
  },
  error => {
    console.log('api error when request sent: ', error);
    return Promise.reject(error);
  },
);

//     //TODO: Error handling
// axiosInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
