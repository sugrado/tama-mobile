import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {GetProfileFromAuthResponse} from './dtos/get-profile-from-auth-response.dto';
import {UpdateFromAuthCommand} from './dtos/update-from-auth.dto';

export const profile = async (): Promise<
  ApiDataResponse<GetProfileFromAuthResponse>
> => {
  try {
    const res = await axiosInstance.get<GetProfileFromAuthResponse>(
      'relatives/profile',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const update = async (
  body: UpdateFromAuthCommand,
): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.put('relatives/from-auth', body);
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};
