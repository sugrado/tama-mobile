export class GetChronicDiseasesByPatientListItemDto {
  id: number;
  detail: string | null;
  chronicDisease: GetChronicDiseasesByPatientChronicDisease;
}

export class GetChronicDiseasesByPatientChronicDisease {
  name: string;
}
