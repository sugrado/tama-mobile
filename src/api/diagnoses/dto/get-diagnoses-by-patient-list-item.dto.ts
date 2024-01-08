export class GetDiagnosesByPatientListItemDto {
  id: number;
  description: string | null;
  startDate: string;
  detectedDisease: GetDiagnosesByPatientDisease;
  medicines: GetDiagnosesByPatientDiagnosisMedicine[];
}

export class GetDiagnosesByPatientDisease {
  name: string;
}

export class GetDiagnosesByPatientDiagnosisMedicine {
  medicineName: string;
  times: GetDiagnosesByPatientMedicineTime[];
}

export class GetDiagnosesByPatientMedicineTime {
  description: string;
}
