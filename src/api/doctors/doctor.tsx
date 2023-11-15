import {GetProfileFromAuthResponse} from './dtos/doctor-profle-response.dto';
import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';

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
