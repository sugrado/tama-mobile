import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {
  CreateAppointmentCommand,
  CreatedAppointmentResponse,
} from './dtos/create-appointment-command';
import {GetAvailableTimesFromDoctorAndDateResponse} from './dtos/get-available-times-from-doctor-and-date-response';
import {GetDoctorAvailableDatesResponse} from './dtos/get-doctor-available-dates-response';
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

export const getDoctorAvailableDates = async (
  doctorId: number,
): Promise<ApiDataResponse<GetDoctorAvailableDatesResponse[]>> => {
  try {
    const res = await axiosInstance.post<GetDoctorAvailableDatesResponse[]>(
      'appointments/doctor-available-dates',
      {
        doctorId,
      },
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const getAvailableTimesFromDoctorAndDate = async (
  doctorId: number,
  date: string,
): Promise<ApiDataResponse<GetAvailableTimesFromDoctorAndDateResponse[]>> => {
  try {
    const res = await axiosInstance.post<
      GetAvailableTimesFromDoctorAndDateResponse[]
    >('appointments/date-available-times', {
      doctorId,
      date,
    });
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const create = async (
  body: CreateAppointmentCommand,
): Promise<ApiDataResponse<CreatedAppointmentResponse>> => {
  try {
    const res = await axiosInstance.post<CreatedAppointmentResponse>(
      'appointments',
      body,
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
