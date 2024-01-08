import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {PatientUsageAnalysisResponse} from './dto/patient-usage-analysis';
import {SaveMedicineUsageDto} from './dto/save-medicine-usage.dto';

export const saveMedicineUsage = async (
  body: SaveMedicineUsageDto,
): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.post('diagnosis-medicine-time-usages', body);
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};

export const patientUsageAnalysis = async (
  patientId: number,
): Promise<ApiDataResponse<PatientUsageAnalysisResponse>> => {
  try {
    const res = await axiosInstance.get<PatientUsageAnalysisResponse>(
      'diagnosis-medicine-time-usages/analysis-by-patient' +
        `?PatientId=${patientId}`,
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
