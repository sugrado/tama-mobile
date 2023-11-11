import {GetProfileFromAuthResponse} from '../dtos/patient-profle-response.dto';
import axiosInstance from '../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../dtos/api';
import {CustomError} from '../utils/customErrors';

export const acceptConsent = async (): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.patch('patients/accept-consent');
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};

export const profile = async (): Promise<
  ApiDataResponse<GetProfileFromAuthResponse>
> => {
  try {
    const res = await axiosInstance.get<GetProfileFromAuthResponse>(
      'patients/profile',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
