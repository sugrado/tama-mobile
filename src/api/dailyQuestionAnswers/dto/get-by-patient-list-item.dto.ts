import {PatientHomeDailyQuestionOption} from '../../dailyQuestions/dto/patient-home-daily-question.dto';

export class GetByPatientListItemDto {
  date: string;
  questions: GetByPatientListItemQuestionDto[];
}

export class GetByPatientListItemQuestionDto {
  description: string;
  answer: GetByPatientListItemAnswerDto;
}

export class GetByPatientListItemAnswerDto {
  id: number;
  answer: string | null;
  selectedOption: PatientHomeDailyQuestionOption | null;
}
