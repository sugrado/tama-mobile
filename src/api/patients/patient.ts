import {GetProfileFromAuthResponse} from './dtos/patient-profle-response.dto';
import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {GetSummaryResponse} from './dtos/get-summary-response';
import {GetMyQRCodeResponse} from './dtos/get-my-qr-code-response.dto';
import {GetHomeScreenDataResponse} from './dtos/get-home-screen-data-response.dto';
import {UpdateFromAuthCommand} from './dtos/update-from-auth.dto';

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

export const update = async (
  body: UpdateFromAuthCommand,
): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.put('patients/from-auth', body);
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};

export const qrSummary = async (
  qrCodeId: string,
): Promise<ApiDataResponse<GetSummaryResponse>> => {
  try {
    const res = await axiosInstance.get<GetSummaryResponse>(
      `patients/${qrCodeId}/qr-summary`,
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const getQRCode = async (): Promise<
  ApiDataResponse<GetMyQRCodeResponse>
> => {
  try {
    const res = await axiosInstance.get<GetMyQRCodeResponse>(
      'patients/qr-code',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const getHomeScreenData = async (): Promise<
  ApiDataResponse<GetHomeScreenDataResponse>
> => {
  try {
    const res = await axiosInstance.get<GetHomeScreenDataResponse>(
      'patients/home',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
