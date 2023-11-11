import {
  LoggedResponse,
  LoginDto,
  PreparedTokensDto,
  UserRoles,
} from '../dtos/auth.dto';
import axiosInstance from '../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../dtos/api';
import {CustomError} from '../utils/customErrors';

export const login = async (
  credential: string,
  password: string,
  role: UserRoles,
): Promise<ApiDataResponse<LoggedResponse>> => {
  try {
    const res = await axiosInstance.post<LoggedResponse>('auth/login', {
      credential,
      password,
      role,
    } as LoginDto);
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const refreshTokens = async (
  refreshToken: string,
): Promise<ApiDataResponse<PreparedTokensDto>> => {
  try {
    const res = await axiosInstance.put('auth/refresh-token', {refreshToken});
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const revokeToken = async (): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.put('auth/revoke-token');
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};
