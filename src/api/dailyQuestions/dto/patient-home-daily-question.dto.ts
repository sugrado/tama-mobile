export class PatientHomeDailyQuestion {
  questionId: number;
  selectedOption: PatientHomeDailyQuestionOption | undefined;
  description: string;
  answer: string | undefined;
  modalTitle: string;
  fieldLabel: string;
  multipleChoice: boolean;
  options: PatientHomeDailyQuestionOption[];
}

export class PatientHomeDailyQuestionOption {
  id: string;
  value: string;
}
