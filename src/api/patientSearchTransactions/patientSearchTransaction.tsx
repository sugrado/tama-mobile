import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {LastTransactionDto} from './dto/get-my-last-transactions-response.dto';

export const getMyLastPatientSearchTransactions = async (): Promise<
  ApiDataResponse<LastTransactionDto[]>
> => {
  try {
    const res = await axiosInstance.get<LastTransactionDto[]>(
      'patient-search-transactions/my-last-transactions',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
