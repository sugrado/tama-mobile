import {GetMyDailyMedicineDto} from './my-daily-medicine.dto';

export class GetByRelativeListItemDto {
  id: number;
  fullName: string;
  details: GetByRelativeDto;
}

export class GetByRelativeDto {
  dailyQuestions: GetByRelativeQuestionDto[];
  dailyMedicines: GetMyDailyMedicineDto[];
  appointment: GetByRelativeAppointmentDto | null;
}

export class GetByRelativeQuestionDto {
  id: number;
  description: string;
  answer: GetByRelativeQuestionAnswerDto | null;
}

export class GetByRelativeQuestionAnswerDto {
  answer: string | null;
  selectedOption: GetByRelativeQuestionAnswerOptionDto | null;
}

export class GetByRelativeQuestionAnswerOptionDto {
  id: number;
  value: string;
}

export class GetByRelativeMedicineDto {}

export class GetByRelativeAppointmentDto {
  takenDate: string;
  probableStartTime: string;
  probableEndTime: string;
  doctorFullName: string;
}
