import axiosInstance from '../contexts/AxiosInterceptor';
import {ApiDataResponse} from '../dtos/api';
import {GetWithOptionsByMessageResponse} from '../dtos/get-with-options-by-message.dto';
import {CustomError} from '../utils/customErrors';

export const getWithOptionsByMessage = async (
  messageId: number | null = null,
): Promise<ApiDataResponse<GetWithOptionsByMessageResponse>> => {
  try {
    const res = await axiosInstance.get<GetWithOptionsByMessageResponse>(
      'messages/get-with-options-by-message' +
        (messageId ? `?messageId=${messageId}` : ''),
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};
