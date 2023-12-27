export class GetDiagnosesByPatientListItemDto {
  id: number;
  description: string | null;
  startDate: string;
  detectedDisease: GetDiagnosesByPatientDisease;
}

export class GetDiagnosesByPatientDisease {
  name: string;
}
