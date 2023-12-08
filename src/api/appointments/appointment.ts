import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {GetMyAppointmentResponse} from './dtos/get-my-appointment-response';

export const getMyAppointment = async (): Promise<
  ApiDataResponse<GetMyAppointmentResponse>
> => {
  try {
    const res = await axiosInstance.get<GetMyAppointmentResponse>(
      'appointments/my-appointment',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const cancelAppointment = async (): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.put('appointments/cancel-my-appointment');
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};
