import {GetProfileFromAuthResponse} from './dtos/patient-profle-response.dto';
import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {GetSummaryResponse} from './dtos/get-summary-response';

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

export const summary = async (
  username: string,
): Promise<ApiDataResponse<GetSummaryResponse>> => {
  try {
    const res = await axiosInstance.get<GetSummaryResponse>(
      `patients/${username}/summary`,
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
