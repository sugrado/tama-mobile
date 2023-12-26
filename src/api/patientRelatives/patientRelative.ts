import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {GetListResponse} from '../../dto/paginate';
import {CustomError} from '../../utils/customErrors';
import {CreatePatientRelativeCommand} from './dto/create-patient-relative-command';
import {GetMyRelativesListItemDto} from './dto/get-my-relatives-list-item.dto';

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

export const getMyRelatives = async (): Promise<
  ApiDataResponse<GetListResponse<GetMyRelativesListItemDto>>
> => {
  try {
    const response = await axiosInstance.get<
      GetListResponse<GetMyRelativesListItemDto>
    >('patient-relatives/my-relatives');
    return {data: response.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

export const remove = async (relativeId: number): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.delete(`patient-relatives/by-relative/${relativeId}`);
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};
