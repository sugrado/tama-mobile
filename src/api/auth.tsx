import {AxiosResponse} from 'axios';
import {
  LoggedResponse,
  LoginDto,
  PreparedTokensDto,
  UserRoles,
} from '../dtos/auth.dto';
import axiosInstance from '../contexts/AxiosInterceptor';

export const login = async (
  credential: string,
  password: string,
  role: UserRoles,
) => {
  const loginRes: AxiosResponse<LoggedResponse> =
    await axiosInstance.post<LoggedResponse>('auth/login', {
      credential,
      password,
      role,
    } as LoginDto);
  return loginRes.data;
};

export const refreshTokens = async (refreshToken: string) => {
  try {
    const loginRes: AxiosResponse<PreparedTokensDto> = await axiosInstance.put(
      'auth/refresh-token',
      {refreshToken},
    );
    return loginRes.data;
  } catch (error) {
    return null;
  }
};

export const revokeToken = async (): Promise<void> => {
  await axiosInstance.put('auth/revoke-token');
};
