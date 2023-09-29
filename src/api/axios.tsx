import axios from 'axios';
import {API_URL} from '../config';

let headers = {'Content-Type': 'application/json'};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers,
  withCredentials: true,
});

export default axiosInstance;
