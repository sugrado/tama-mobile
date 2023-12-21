export class GetProfileFromAuthResponse {
  titleName: string;
  workAddress: string;
  availableForAppointment: boolean;
  user: DoctorUserProfile;
}

export class DoctorUserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
