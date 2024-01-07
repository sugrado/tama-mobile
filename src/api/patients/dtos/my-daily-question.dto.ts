export class MyDailyQuestion {
  questionId: number;
  selectedOption: MyDailyQuestionOption | undefined;
  description: string;
  answer: string | undefined;
  modalTitle: string;
  fieldLabel: string;
  multipleChoice: boolean;
  options: MyDailyQuestionOption[];
}

export class MyDailyQuestionOption {
  id: string;
  value: string;
}
