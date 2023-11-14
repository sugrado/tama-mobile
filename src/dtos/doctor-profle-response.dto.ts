export class GetProfileFromAuthResponse {
  workAddress: string;
  user: DoctorUserProfile;
}

export class DoctorUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
