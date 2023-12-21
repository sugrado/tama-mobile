import {GetProfileFromAuthResponse} from './dtos/get-profile-from-auth-response.dto';
import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {GetListForAppointmentResponse} from './dtos/get-list-for-appointment.dto';
import {GetListResponse} from '../../dto/paginate';

export const profile = async (): Promise<
  ApiDataResponse<GetProfileFromAuthResponse>
> => {
  try {
    const res = await axiosInstance.get<GetProfileFromAuthResponse>(
      'doctors/profile',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const getListForAppointment = async (): Promise<
  ApiDataResponse<GetListResponse<GetListForAppointmentResponse>>
> => {
  try {
    const res = await axiosInstance.get<
      GetListResponse<GetListForAppointmentResponse>
    >('doctors/list-for-appointment');
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
