import axiosInstance from '../../contexts/AxiosInterceptor';
import {ApiDataResponse, ApiErrorResponse} from '../../dto/api';
import {CustomError} from '../../utils/customErrors';
import {AnswerDailyQuestionDto} from './dto/answer-daily-question.dto';
import {PatientHomeDailyQuestion} from './dto/patient-home-daily-question.dto';

export const getMyDailyQuestions = async (): Promise<
  ApiDataResponse<PatientHomeDailyQuestion[]>
> => {
  try {
    const res = await axiosInstance.get<PatientHomeDailyQuestion[]>(
      'daily-questions/my-daily',
    );
    return {data: res.data, error: null};
  } catch (error) {
    return {data: null, error: error as CustomError};
  }
};

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
