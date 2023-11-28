import axios, {
  AxiosError,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';
import {ReactNode, useEffect} from 'react';
import {AuthContextType, useAuth} from './AuthContext';
import {API_URL} from '../config';
import {getAccessTokenFromStorage} from '../utils/storage';
import {
  checkIsLoggedIn,
  refreshTokensThenResetDeviceData,
} from '../services/auth.service';
import {
  AuthorizationError,
  BusinessError,
  InternalServerError,
  NotFoundError,
  RequestError,
} from '../utils/customErrors';
declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

let headers = {'Content-Type': 'application/json'};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers,
});

const REQUEST_ERR_MSG =
  'Sayfa yüklenirken bir hata oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.';
const INTERNAL_SERVER_ERR_MSG =
  'Beklenmedik bir hata oluştu. Eğer hata devam ederse lütfen sistem yöneticisi ile iletişime geçin.';

type AxiosInterceptorProps = {
  children: React.ReactNode;
};

const AxiosInterceptor = ({children}: AxiosInterceptorProps): ReactNode => {
  const {setUserInfo}: AuthContextType = useAuth();

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

    const responseErrInterceptor = async (error: AxiosError) => {
      if (error.response) {
        const errorMsg = (error.response as AxiosResponse<any>).data.detail;
        if (error.response.status === HttpStatusCode.BadRequest) {
          throw new BusinessError(errorMsg);
        }
        if (error.response.status === HttpStatusCode.Unauthorized) {
          const originalRequest = error.config;
          if (originalRequest === undefined || originalRequest._retry) {
            return;
          }
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
        }
        if (error.response.status === HttpStatusCode.Forbidden) {
          throw new AuthorizationError(errorMsg);
        }
        if (error.response.status === HttpStatusCode.NotFound) {
          throw new NotFoundError(errorMsg);
        }
        if (error.response.status === HttpStatusCode.InternalServerError) {
          throw new InternalServerError(INTERNAL_SERVER_ERR_MSG);
        }
      } else if (error.request) {
        throw new RequestError(REQUEST_ERR_MSG);
      }
      throw new InternalServerError(INTERNAL_SERVER_ERR_MSG);
    };

    const requestInterceptor = axiosInstance.interceptors.request.use(
      requestConfigInterceptor,
      undefined,
    );
    const responseInterceptor = axiosInstance.interceptors.response.use(
      undefined,
      responseErrInterceptor,
    );

    return (): void => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [setUserInfo]);

  return children;
};

export default axiosInstance;
export {AxiosInterceptor};
