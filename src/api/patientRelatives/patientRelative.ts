import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {CreatePatientRelativeCommand} from './dto/create-patient-relative-command';

export const create = async (
  body: CreatePatientRelativeCommand,
): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.post('patient-relatives', body);
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};
