import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {useEffect} from 'react';
import {useAuth} from './AuthContext';
import {API_URL} from '../config';
import {getAccessTokenFromStorage} from '../utils/storage';
import {
  checkIsLoggedIn,
  refreshTokensThenResetDeviceData,
} from '../services/auth.service';

let headers = {'Content-Type': 'application/json'};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers,
  withCredentials: true,
});

type AxiosInterceptorProps = {
  children: React.ReactNode;
};

const AxiosInterceptor = ({children}: AxiosInterceptorProps) => {
  const {setUserInfo} = useAuth();

  useEffect(() => {
    const requestConfigInterceptor = async (
      config: InternalAxiosRequestConfig,
    ) => {
      if (config.url === '/auth/login') {
        return config;
      }
      const tokenFromStorage = await getAccessTokenFromStorage();
      if (tokenFromStorage && tokenFromStorage.token) {
        config.headers.Authorization = `Bearer ${tokenFromStorage.token}`;
      }
      return config;
    };
    const requestErrInterceptor = (error: any) => {
      return Promise.reject(error);
    };

    const responseResInterceptor = (response: AxiosResponse) => response;

    const responseErrInterceptor = async (error: any) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const checkedResult = await checkIsLoggedIn();
        if (checkedResult === null) {
          setUserInfo(null);
          return;
        }

        const preparedTokens = await refreshTokensThenResetDeviceData(
          checkedResult,
        );
        if (preparedTokens === null) {
          setUserInfo(null); // otomatik login sayfasına yönlendiriliyor
          return;
        }

        originalRequest.headers.Authorization = `Bearer ${preparedTokens.accessToken.token}`;
        return await axiosInstance(originalRequest);
      } else if (error.response.status === 403) {
        // TODO
      } else if (error.response.status === 400) {
        // TODO
      }

      return Promise.reject(error);
    };

    const requestInterceptor = axiosInstance.interceptors.request.use(
      requestConfigInterceptor,
      requestErrInterceptor,
    );
    const responseInterceptor = axiosInstance.interceptors.response.use(
      responseResInterceptor,
      responseErrInterceptor,
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [setUserInfo]);

  return children;
};

export default axiosInstance;
export {AxiosInterceptor};
