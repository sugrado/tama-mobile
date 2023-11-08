import {AxiosResponse} from 'axios';
import axiosInstance from '../api/axios';
import {LoggedResponse, LoginDto, UserRoles} from '../dtos/auth.dto';

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

export const revokeToken = async (): Promise<void> => {
  await axiosInstance.put('auth/revoke-token');
};
