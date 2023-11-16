export class DailyMedicineDto {
  id: number;
  name: string;
  times: TimeDto[];
}

export class TimeDto {
  id: string;
  value: string;
  used: boolean;
}
