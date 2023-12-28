import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse} from '../../dto/api';
import {GetListResponse} from '../../dto/paginate';
import {CustomError} from '../../utils/customErrors';
import {GetByPatientListItemDto} from './dto/get-by-patient-list-item.dto';

export const getPatientAnsweredQuestions = async (
  patientId: number,
  index: number,
  size: number,
): Promise<ApiDataResponse<GetListResponse<GetByPatientListItemDto>>> => {
  try {
    const response = await axiosInstance.get<
      GetListResponse<GetByPatientListItemDto>
    >(
      `patients/${patientId}/answered-questions?PageIndex=${index}&PageSize=${size}`,
    );
    return {data: response.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
