import {GetProfileFromAuthResponse} from './dtos/get-profile-from-auth-response.dto';
import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {GetMyQRCodeResponse} from './dtos/get-my-qr-code-response.dto';
import {GetHomeScreenDataResponse} from './dtos/get-home-screen-data-response.dto';
import {UpdateFromAuthCommand} from './dtos/update-from-auth.dto';
import {GetListResponse} from '../../dto/paginate';
import {GetByRelativeListItemDto} from './dtos/get-by-relative-list-item.dto';
import {GetQRSummaryResponse} from './dtos/get-summary-response';
import {GetMyMedicinesDto} from './dtos/get-my-medicines.dto';
import {MyDailyQuestion} from './dtos/my-daily-question.dto';
import {GetMyDailyMedicineDto} from './dtos/my-daily-medicine.dto';
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
): Promise<ApiDataResponse<GetQRSummaryResponse>> => {
  try {
    const res = await axiosInstance.get<GetQRSummaryResponse>(
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

export const getByRelative = async (): Promise<
  ApiDataResponse<GetListResponse<GetByRelativeListItemDto>>
> => {
  try {
    const res = await axiosInstance.get<
      GetListResponse<GetByRelativeListItemDto>
    >('patients/by-relative');
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const getMyMedicines = async (): Promise<
  ApiDataResponse<GetMyMedicinesDto[]>
> => {
  try {
    const res = await axiosInstance.get<GetMyMedicinesDto[]>(
      'patients/my-medicines',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const getMyDailyQuestions = async (): Promise<
  ApiDataResponse<MyDailyQuestion[]>
> => {
  try {
    const res = await axiosInstance.get<MyDailyQuestion[]>(
      'patients/my-daily-questions',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const getMyDailyMedicines = async (): Promise<
  ApiDataResponse<GetMyDailyMedicineDto[]>
> => {
  try {
    const res = await axiosInstance.get<GetMyDailyMedicineDto[]>(
      'patients/my-daily-medicines',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
