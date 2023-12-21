import {
  LoggedResponse,
  LoginDto,
  PreparedTokensDto,
  UserRoles,
} from './dtos/auth.dto';
import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {ChangePassword} from './dtos/change-password.dto';
import {ChangeEmail} from './dtos/change-email.dto';
import {PasswordResetDto} from './dtos/password-reset.dto';
import {
  RegisterDoctorRecord,
  RegisterRelativeRecord,
} from './dtos/register-doctor-record';

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

export const registerDoctor = async (
  body: RegisterDoctorRecord,
): Promise<ApiDataResponse<LoggedResponse>> => {
  try {
    const res = await axiosInstance.post<LoggedResponse>(
      'auth/register/doctor',
      body,
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const registerRelative = async (
  body: RegisterRelativeRecord,
): Promise<ApiDataResponse<LoggedResponse>> => {
  try {
    const res = await axiosInstance.post<LoggedResponse>(
      'auth/register/relative',
      body,
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const changePassword = async (
  body: ChangePassword,
): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.put('auth/change-password', body);
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};

export const changeEmail = async (
  body: ChangeEmail,
): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.put('auth/change-email', body);
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};

export const passwordReset = async (
  body: PasswordResetDto,
): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.post('auth/password-reset', body);
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
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

export const validateSession = async (): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.get('auth/validate-session');
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};

export const revokeToken = async (
  refreshToken: string,
): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.put('auth/revoke-token', {refreshToken});
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};
