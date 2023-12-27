import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse} from '../../dto/api';
import {GetListResponse} from '../../dto/paginate';
import {CustomError} from '../../utils/customErrors';
import {GetChronicDiseasesByPatientListItemDto} from './dto/GetChronicDiseasesByPatientListItemDto';

export const getPatientChronicDiseases = async (
  patientId: number,
): Promise<
  ApiDataResponse<GetListResponse<GetChronicDiseasesByPatientListItemDto>>
> => {
  try {
    const response = await axiosInstance.get<
      GetListResponse<GetChronicDiseasesByPatientListItemDto>
    >(`patients/${patientId}/chronic-diseases`);
    return {data: response.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
