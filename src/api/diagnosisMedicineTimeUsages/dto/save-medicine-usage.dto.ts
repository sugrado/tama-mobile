export class SaveMedicineUsageDto {
  medicineId: number;
  time: string;
  used: boolean;
  requestedAt: Date | string;
}
