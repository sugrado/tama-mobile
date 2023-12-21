export class GetProfileFromAuthResponse {
  address: string;
  dailyTeaConsumption: number | string;
  dailyCoffeeConsumption: number | string;
  user: PatientUserProfile;
}

export class PatientUserProfile {
  firstName: string;
  lastName: string;
}
