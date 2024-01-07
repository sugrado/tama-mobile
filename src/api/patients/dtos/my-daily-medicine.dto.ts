export class GetMyDailyMedicineDto {
  medicineId: number;
  name: string;
  times: GetMyDailyMedicineTimeDto[];
}

export class GetMyDailyMedicineTimeDto {
  time: string;
  used: boolean | null;
}
