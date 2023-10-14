export class QuestionDto {
  id: number;
  description: string;
  options: OptionDto[];
  modalTitle: string;
  fieldLabel: string;
  answered: boolean;
  answer: string | null;
}

export class OptionDto {
  id: string;
  value: string;
}
