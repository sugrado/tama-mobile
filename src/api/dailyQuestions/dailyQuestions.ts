import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {AnswerDailyQuestionDto} from './dto/answer-daily-question.dto';

export const answerDailyQuestion = async (
  body: AnswerDailyQuestionDto,
): Promise<ApiErrorResponse> => {
  try {
    await axiosInstance.post('daily-questions/answer', body);
    return {error: null};
  } catch (error) {
    return {error: error as CustomError};
  }
};
