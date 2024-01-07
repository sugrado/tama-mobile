import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
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
