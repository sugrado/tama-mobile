import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse} from '../../dto/api';
import {GetListResponse} from '../../dto/paginate';
import {CustomError} from '../../utils/customErrors';
import {GetDiagnosesByPatientListItemDto} from './dto/get-diagnoses-by-patient-list-item.dto';

export const getPatientDiagnoses = async (
  patientId: number,
): Promise<
  ApiDataResponse<GetListResponse<GetDiagnosesByPatientListItemDto>>
> => {
  try {
    const response = await axiosInstance.get<
      GetListResponse<GetDiagnosesByPatientListItemDto>
    >(`patients/${patientId}/diagnoses`);
    return {data: response.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
